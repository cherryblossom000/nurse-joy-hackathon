import Router from '@koa/router'
import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'
import Koa from 'koa'
import serveStatic from 'koa-static'
import type {AddressInfo} from 'node:net'
import type {Patient} from '../../shared'

dotenv.config()

const client = new MongoClient(process.env.DATABASE_URL!, {
  ...(process.env.NODE_ENV === 'production'
    ? {
        auth: {
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD
        }
      }
    : {}),
  retryWrites: true,
  w: 'majority'
})

const db = client.db()
const patients = db.collection<Patient>('patients')

const app = new Koa()
const router = new Router().get('/api/patients', async ctx => {
  ctx.body = await patients.find({}).toArray()
})

const server = app
  .use(
    serveStatic(new URL('../../client/dist', import.meta.url).pathname, {
      extensions: ['html']
    })
  )
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080, async () => {
    await client.connect()
    console.log(`http://localhost:${(server.address() as AddressInfo).port}`)
  })
