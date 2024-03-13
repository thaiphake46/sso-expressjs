const mongoose = require('mongoose')

const DOCUMENT_NAME = 'User'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  // email_verified: {
  //   type: Boolean,
  //   default: false,
  // },
  password: {
    type: String,
  },
})

const User = mongoose.model(DOCUMENT_NAME, userSchema)

module.exports = User
