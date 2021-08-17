// TODO: fix typescript-eslint module resolution
/* eslint-disable eslint-comments/disable-enable-pair, eslint-comments/require-description -- ^ */
/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
/* eslint-enable eslint-comments/disable-enable-pair, eslint-comments/require-description */

import Router from '@koa/router'
import dotenv from 'dotenv'
import * as E from 'fp-ts/lib/Either.js'
import {pipe} from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import {MongoClient} from 'mongodb'
import Koa from 'koa'
import serveStatic from 'koa-static'
import {v4 as uuid} from 'uuid'
import {Gender, PatientWithoutId} from '@nurse-joy-hackathon/shared'
import type {AddressInfo} from 'node:net'
import type {Patient} from '@nurse-joy-hackathon/shared'

dotenv.config()

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

type MaybePromise<T> = Promise<T> | T

interface StatusAndBody {
  readonly status: number
  readonly body?: unknown
}

const decoding = async <T>(
  ctx: Koa.ParameterizedContext<unknown, Router.RouterParamContext<unknown>>,
  codec: t.Decoder<unknown, T>,
  fn: (data: T) => Promise<StatusAndBody>
): Promise<void> => {
  const {status, body} = await pipe(
    codec.decode(ctx.request.body),
    E.match<
      t.Errors,
      T,
      MaybePromise<{readonly status: number; readonly body?: unknown}>
    >(
      errors => ({
        status: 400,
        body: {message: 'Invalid request body', error: errors}
      }),
      fn
    )
  )
  /* eslint-disable require-atomic-updates -- not race condition */
  ctx.status = status
  ctx.body = body
  /* eslint-enable require-atomic-updates -- not race condition */
}

const app = new Koa()
const router = new Router()
  .get('/api/patients', async ctx => {
    ctx.body = await patients.find({}).toArray()
  })
  .post('/api/patients', async ctx =>
    decoding(ctx, PatientWithoutId, async data => {
      const id = ctx.params.id!
      if (await patients.findOne({_id: id}))
        return {status: 409, message: 'Patient already exists'}
      const patient = {_id: uuid(), ...data}
      await patients.insertOne(patient)
      return {
        status: 201,
        body: patient
      }
    })
  )
  .patch('/api/patients/:id', async ctx =>
    decoding(ctx, PatientPatchInput, async data => {
      const id = ctx.params.id!
      if (await patients.findOne({_id: id})) {
        await patients.updateOne({_id: id}, {$set: data})
        return {status: 204}
      }
      return {
        status: 404,
        body: {message: 'Patient not found'}
      }
    })
  )
  .delete('/api/patients/:id', async ctx => {
    const id = ctx.params.id!
    if (await patients.findOne({_id: id})) {
      await patients.deleteOne({_id: id})
      /* eslint-disable require-atomic-updates -- not race condition */
      ctx.status = 204
    } else {
      ctx.status = 404
      ctx.body = {message: 'Patient not found'}
      /* eslint-enable require-atomic-updates -- not race condition */
    }
  })

const server = app
  .use(logger())
  .use(
    serveStatic(new URL('../../client/dist', import.meta.url).pathname, {
      extensions: ['html']
    })
  )
  .use(bodyParser({enableTypes: ['json']}))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080, async () => {
    await client.connect()
    if (dev) {
      console.log(`http://localhost:${(server.address() as AddressInfo).port}`)
      if (!(await patients.countDocuments())) {
        await patients.insertMany([
          {
            _id: uuid(),
            name: 'Jane Smith',
            age: 16,
            height: 160,
            weight: 60,
            gender: Gender.Female,
            phoneNumber: '0412345678',
            address: '1 Something St, Suburb, VIC 1234 Australia',
            email: 'jane.smith@mail.com',
            injuryType: 'Injury type 1',
            urgency: 1
          },
          {
            _id: uuid(),
            name: 'John Doe',
            age: 25,
            height: 178,
            weight: 82,
            gender: Gender.Male,
            phoneNumber: '0213516436',
            address: '1 Abc St, Def, VIC 1234 Australia',
            email: 'john.doe@mail.com',
            injuryType: 'Injury type 2',
            urgency: 2
          },
          {
            _id: uuid(),
            name: 'First Last',
            age: 42,
            height: 170,
            weight: 79,
            gender: Gender.Other,
            phoneNumber: '0235729573',
            address: '20 SAfd Ln, Saregdf, VIC 3246 Australia',
            email: 'first.last@mail.com',
            injuryType: 'COVID-19',
            urgency: 3
          }
        ])
      }
    }
  })
