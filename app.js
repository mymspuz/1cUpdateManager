const express = require('express')
const sequelize = require('./utils/sequelizeConnect')
const morgan = require('morgan')
//const bodyParser = require('body-parser')

// Routes
const authRoutes = require('./routes/auth')

// Create instance server
const app = express()
// Port server
const myPort = process.env.PORT || 8081
// Connect to DB
sequelize.authenticate()
    .then(() => {
        console.info('Connection to DB is successful...')
    })
    .catch(err => {
        console.warn('Connection to DB is error: ', err)
    })
// Add static directory
app.use(express.static('public'))
// Log on server
app.use(morgan('dev'))
// Post in json
//app.use(express.urlencoded({extend: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)

// Start server
app.listen(myPort, () => {
    console.log(`Server runing on port - ${myPort}...`)
})