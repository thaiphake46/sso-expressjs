require('module-alias/register')
const express = require('express')
const env = require('./configs/env')
const appConfig = require('./configs/appConfig')
const appRoute = require('./routes')

const app = express()

// app config
appConfig(app)

// app route
app.use('/', appRoute)

const port = env.PORT

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
