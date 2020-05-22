const Sequelize = require('sequelize')

const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const config = require('../config/keys')
const sysUtils = require('../utils/sysUtils')

module.exports.user = async (req, res) => {
    const uid = sysUtils.idFromToken(req.headers.authorization)
    if (uid.status) {
        const user = await User.findByPk(uid.result)
        if (user) {
            return res.status(200).json(user)
        }
    } else {
        res.status(500).json({})
    }
}
