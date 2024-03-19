const authRoute = require('./auth')
const router = require('express').Router()

router.get('/', (req, res, next) => {
  return res.json(req.session)
})

router.use('/auth', authRoute)

module.exports = router
