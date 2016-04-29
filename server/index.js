const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/auth/first_test')

// App Setup
app.use(morgan('combined')) // logging framework
app.use(bodyParser.json({ type: '*/*'})) // for now run all requests as json
router(app)

const port = process.env.PORT || 3090
const server = http.createServer(app)

server.listen(port)
console.log('Server listening on:', port)
