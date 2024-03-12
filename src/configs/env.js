require('dotenv').config()
const { cleanEnv, port, str } = require('envalid')

const env = cleanEnv(process.env, {
  PORT: port(),

  MONGO_CONNECT_STRING: str(),
})

module.exports = env
