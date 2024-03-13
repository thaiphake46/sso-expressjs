const Joi = require('joi')

const registerJoiSchema = Joi.object({
  username: Joi.string().min(3).max(20).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
  // repeatPassword: Joi.any()
  //   .equal(Joi.ref('password'))
  //   .required()
  //   .label('Repeat password')
  //   .options({ messages: { 'any.only': { allowOnly: '{{#label}} does not match' } } }),
})

module.exports = { registerJoiSchema }
