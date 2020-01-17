require('isomorphic-fetch')
const Koa = require('koa')
const next = require('next')
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth')
const dotenv = require('dotenv')
const { verifyRequest } = require('@shopify/koa-shopify-auth')
const session = require('koa-session')
const serve = require('koa-static')
const mount = require('koa-mount')
const request = require('request')

dotenv.config()

const port = process.env.PORT || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env

app.prepare().then(() => {
  const server = new Koa()
  server.use(mount('/public', serve('./public')))
  server.use(session(server))
  server.keys = [SHOPIFY_API_SECRET_KEY]

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [
        'read_themes',
        'write_themes',
        'read_content',
        'write_content',
        'write_script_tags',
        'read_customers',
        'write_customers'
      ],
      afterAuth(ctx) {
        ctx.cookies.set('shopOrigin', ctx.session.shop, { httpOnly: false })
        ctx.redirect('/')
      }
    })
  )

  server.use(verifyRequest())
  server.use(async ctx => {
    await handle(ctx.req, ctx.res)
    console.log('AccessToken: ', ctx.session.accessToken)
    ctx.respond = false
    ctx.res.statusCode = 200
    return
  })

  //ToDo uninstall webhook endpoint to remove rmd-wishlist.js

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
