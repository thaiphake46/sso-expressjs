const passport = require('passport')
const { findUserByEmail } = require('~/services/userService')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const bcrypt = require('bcrypt')
const User = require('~/schemas/user')

function appPassport() {
  // passport local config
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await findUserByEmail(email).catch()

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

  const clientID = '307806914516-9doi6s2dk239n0utiq8uff2196u58tig.apps.googleusercontent.com'
  const clientSecret = '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'
  const callbackURL = 'http://localhost:3000/auth/google/callback'
  passport.use(
    new GoogleStrategy(
      { clientID, clientSecret, callbackURL, passReqToCallback: true },
      async (req, accessToken, refreshToken, profile, done) => {
        const defaultUser = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          email_verified: profile.emails[0].verified,
          avatar: profile.photos[0].value,
          googleId: profile.id,
        }

        let user = await User.findOne({ email: defaultUser.email })
          .exec()
          .catch((error) => {
            console.log('Error sign in google')
            console.log(error)
          })

        if (!user)
          user = await User.create(defaultUser).catch((error) => {
            console.log('Error sign in google')
            console.log(error)
            done(error)
          })

        done(null, user)
      },
    ),
  )

  passport.serializeUser((user, done) => {
    console.log('serializeUser:', user)
    done(null, user.email)
  })

  passport.deserializeUser(async (email, done) => {
    const user = await User.findOne({ email })
      .exec()
      .catch((error) => {
        console.log('Error deserializeUser')
        console.log(error)
        done(error)
      })

    console.log('deserializeUser:', user)

    if (!user) done(null, null)
    done(null, user)
  })
}

module.exports = appPassport
