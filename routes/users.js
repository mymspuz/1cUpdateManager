const express = require('express')
const router = express.Router()

const controller = require('../controllers/users')

router.post('/user', controller.user)

module.exports = router
