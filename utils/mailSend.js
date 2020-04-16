const nodemailer = require('nodemailer')
const config = require('../config/keys')

const transporter = nodemailer.createTransport({
                        host: config.mailHost,
                        port: config.mailPort,
                        secure: config.mailSecure,
                        auth: {
                            user: config.mailUser,
                            pass: config.mailPassword
                        }
                })

module.exports = transporter