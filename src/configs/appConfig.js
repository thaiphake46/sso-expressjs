const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const { default: helmet } = require('helmet')
const ConnectMongo = require('./ConnectMongo')
const path = require('path')
const session = require('express-session')
const env = require('./env')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { findUserByEmail } = require('~/services/userService')
const bcrypt = require('bcrypt')
const MongoStore = require('connect-mongo')

/**
 * @param {express.Express} app
 */
function appConfig(app) {
  app.use(cors())
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

  // passport local config
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await findUserByEmail(email)

          if (!user || !bcrypt.compareSync(password, user?.password)) {
            done(null, false, { message: 'Username or password incorrect' })
          }

          done(null, user)
        } catch (error) {
          done(error)
        }
      },
    ),
  )

  passport.serializeUser((user, done) => {
    done(null, user.email)
  })

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await findUserByEmail(email)

      if (!user) done(null, false)

      done(null, user)
    } catch (error) {
      done(error)
    }
  })
}

module.exports = appConfig
