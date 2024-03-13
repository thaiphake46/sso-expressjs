const mongoose = require('mongoose')
const env = require('./env')

const MONGODB_URI = env.MONGODB_URI

class ConnectMongo {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`- Mongo connection successful`)
      })
      .catch((err) => {
        throw err
      })
  }
}

module.exports = ConnectMongo
