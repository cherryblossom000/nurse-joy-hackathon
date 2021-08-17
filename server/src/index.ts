import Koa from 'koa'
import serveStatic from 'koa-static'
import type {AddressInfo} from 'node:net'

const app = new Koa()
app.use(
  serveStatic(new URL('../../client/dist', import.meta.url).pathname, {
    extensions: ['html']
  })
)

const server = app.listen(3000, () =>
  console.log(`http://localhost:${(server.address() as AddressInfo).port}`)
)
