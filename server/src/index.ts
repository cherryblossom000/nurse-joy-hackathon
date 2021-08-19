// eslint-disable-next-line eslint-comments/disable-enable-pair -- whole file */
/* eslint-disable require-atomic-updates -- ctx.(status|body) are not race conditions */

import Router from '@koa/router'
import dotenv from 'dotenv'
import * as E from 'fp-ts/lib/Either.js'
import {pipe} from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import Koa from 'koa'
import auth from 'koa-basic-auth'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import serveStatic from 'koa-static'
import {MongoClient} from 'mongodb'
import {v4 as uuid} from 'uuid'
import {PatientWithoutId} from '@nurse-joy-hackathon/shared'
import type {AddressInfo} from 'node:net'
import type {Patient} from '@nurse-joy-hackathon/shared'

dotenv.config({path: new URL('../.env', import.meta.url).pathname})

const dev = process.env.NODE_ENV !== 'production'

const client = new MongoClient(process.env.DATABASE_URL!, {
  ...(dev
    ? {}
    : {
        auth: {
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD
        }
      }),
  retryWrites: true,
  w: 'majority'
})

const db = client.db(process.env.DATABASE_NAME)
const patients = db.collection<Patient>('patients')

const PatientPatchInput = t.partial(PatientWithoutId.props)
type PatientPatchInput = t.TypeOf<typeof PatientPatchInput>

const decoding = async <T>(
  ctx: Koa.ParameterizedContext<unknown, Router.RouterParamContext<unknown>>,
  codec: t.Decoder<unknown, T>,
  fn: (data: T) => Promise<void>
): Promise<void> =>
  pipe(
    codec.decode(ctx.request.body),
    E.match<t.Errors, T, Promise<void> | void>(errors => {
      ctx.throw('Bad request', 400, errors)
    }, fn)
  )

const app = new Koa()
const apiRoutes = new Router()
  .prefix('/api')
  .get('/patients', async ctx => {
    ctx.body = await patients.find({}).toArray()
  })
  .post('/patients', async ctx =>
    decoding(ctx, PatientWithoutId, async data => {
      const id = ctx.params.id!
      if (await patients.findOne({_id: id}))
        ctx.throw('Patient already exists', 409)
      else {
        const patient = {_id: uuid(), ...data}
        await patients.insertOne(patient)
        ctx.status = 201
        ctx.body = patient
      }
    })
  )
  .patch('/patients/:id', async ctx =>
    decoding(ctx, PatientPatchInput, async data => {
      const id = ctx.params.id!
      if (await patients.findOne({_id: id})) {
        await patients.updateOne({_id: id}, {$set: data})
        ctx.status = 204
      } else ctx.throw('Patient not found', 404)
    })
  )
  .delete('/patients/:id', async ctx => {
    const id = ctx.params.id!
    if (await patients.findOne({_id: id})) {
      await patients.deleteOne({_id: id})
      ctx.status = 204
    } else ctx.throw('Patient not found', 404)
  })

const server = app
  .use(logger())
  .use(
    auth({
      name: process.env.USERNAME!,
      pass: process.env.PASSWORD!
    })
  )
  .use(
    serveStatic(new URL('../../client/dist', import.meta.url).pathname, {
      extensions: ['html']
    })
  )
  .use(bodyParser({enableTypes: ['json']}))
  .use(apiRoutes.routes())
  .use(apiRoutes.allowedMethods())
  .listen(8080, async () => {
    await client.connect()
    if (dev)
      console.log(`http://localhost:${(server.address() as AddressInfo).port}`)
  })
