require('./config')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const Todos = require('./models/todos')
const User = require('./models/user')
require('./setup/mongoose')

const PORT = process.env.PORT

const app = express()

app.use(bodyParser.json())

require('./routes')(app)

app.listen(PORT, () => console.log(`Started at http://localhost:${PORT}`))

module.exports = { app }
