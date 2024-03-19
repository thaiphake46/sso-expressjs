const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const { default: helmet } = require('helmet')
const ConnectMongo = require('./ConnectMongo')
const path = require('path')
const session = require('express-session')
const env = require('./env')
const MongoStore = require('connect-mongo')
const appPassport = require('./passport')
const passport = require('passport')

/**
 * @param {express.Express} app
 */
function appConfig(app) {
  app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // template engine
  app.set('view engine', 'ejs')
  app.set('views', path.join(process.cwd(), 'src/views'))

  // connect mongo
  new ConnectMongo()

  // express session config
  app.use(
    session({
      secret: env.EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: env.MONGODB_URI,
      }),
      cookie: {
        maxAge: env.EXPRESS_SESSION_COOKIE_MAX_AGE,
      },
    }),
  )

  // passport config
  app.use(passport.initialize())
  app.use(passport.session())
  appPassport()
}

module.exports = appConfig
