require('dotenv').config()
const { cleanEnv, port, str } = require('envalid')
const ms = require('ms')

const _env = cleanEnv(process.env, {
  PORT: port(),
  MONGODB_URI: str(),
  EXPRESS_SESSION_SECRET: str(),
  EXPRESS_SESSION_COOKIE_MAX_AGE: str(),
})

const env = {
  PORT: _env.PORT,
  MONGODB_URI: _env.MONGODB_URI,
  EXPRESS_SESSION_SECRET: _env.EXPRESS_SESSION_SECRET,
  EXPRESS_SESSION_COOKIE_MAX_AGE: ms(_env.EXPRESS_SESSION_COOKIE_MAX_AGE),
}

module.exports = env
