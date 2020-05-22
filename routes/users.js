const express = require('express')
const passport = require('passport')
const router = express.Router()

const controller = require('../controllers/users')

router.get('/', passport.authenticate('jwt', { session: false }), controller.user)

module.exports = router
