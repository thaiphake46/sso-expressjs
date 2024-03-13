const { registerPage, registerUser } = require('~/controllers/authController')

const router = require('express').Router()

// [GET] /auth/register
router.get('/register', registerPage)

// [POST] /auth/register
router.post('/register', registerUser)

module.exports = router
