const bcrypt = require('bcrypt')
const { registerJoiSchema } = require('~/schemas/joi')
const User = require('~/schemas/user')
const { findUserByEmail } = require('~/services/userService')

const registerPage = (req, res, next) => {
  res.render('register')
}

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    const user = await findUserByEmail(email)

    const { error } = registerJoiSchema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.json(error)
    }

    if (user) {
      return res.render('register', { error: 'Email is already in use', username, email })
    }

    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    })

    req.login(newUser, (error) => {
      if (error) return next(error)
      return res.redirect('/')
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { registerPage, registerUser }
