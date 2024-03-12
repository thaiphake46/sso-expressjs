const express = require('express')
const { Express } = require('express')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const { default: helmet } = require('helmet')
const ConnectMongo = require('./ConnectMongo')

/**
 * @param {express.Express} app
 */
function appConfig(app) {
  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // connect mongo
  const mongoInstance = new ConnectMongo()
}

module.exports = appConfig
