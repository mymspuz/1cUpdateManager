const express = require('express')
const sequelize = require('./utils/sequelizeConnect')
const morgan = require('morgan')

// Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')

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
app.use(express.json())
// Add routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
// Start server
app.listen(myPort, () => {
    console.log(`Server runing on port - ${myPort}...`)
})
