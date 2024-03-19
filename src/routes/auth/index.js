const passport = require('passport')
const { isUserAuthenticated } = require('~/middlewares/authMiddleware')

const router = require('express').Router()

// [GET] /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// [GET] /auth/google/callback
const successLoginUrl = 'http://localhost:5173/login/success'
const errorLoginUrl = 'http://localhost:5173/login/error'
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Can not login Google. Please again later!',
    failureRedirect: errorLoginUrl,
  }),
  (req, res) => {
    console.log('[user] /google/callback', req.user)
    res.cookie('accessToken', 'hahaha', { httpOnly: true, maxAge: 3600 * 1000 })
    res.redirect(successLoginUrl)
  },
)

// [GET] /auth/
router.get('/users', (req, res, next) => {
  res.json(req.user)
})

module.exports = router
