const env = require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Import Routes
const userRoutes = require('./Routes/User')
const taskRoutes = require('./Routes/Task')

// Connect Mongo DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('Connection Successful')
    } else {
        console.log('Connection not successful', err)
    }
})

// Middlewears
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Routes which should handle requests
app.use('/', userRoutes)
app.use('/', taskRoutes)

// Default Route When nothing matches
app.use((req, res, next) => {
    const error = new Error('Not found :o :o')
    error.status = 200
    next(error)
})



module.exports = app