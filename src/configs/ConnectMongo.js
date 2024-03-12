const mongoose = require('mongoose')
const env = require('./env')

const MONGO_CONNECT_STRING = env.MONGO_CONNECT_STRING

class ConnectMongo {
  constructor() {
    this.connect()
  }

  connect = function () {
    mongoose
      .connect(MONGO_CONNECT_STRING)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`- Mongo connection successful`)
      })
      .catch((err) => {
        throw err
      })
  }

  static getInstance = function () {
    if (!ConnectMongo.instance) {
      ConnectMongo.instance = new ConnectMongo()
    }

    return ConnectMongo.instance
  }
}

module.exports = ConnectMongo
