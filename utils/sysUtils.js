const jwt = require('jsonwebtoken')
const config = require('../config/keys')

module.exports.str_gen = (len) => {
    const chrs = 'abcdehklmnopqrstuwxzABCDEFGHKMNPQRSTWXZ1234567890'
    let str = ''
    for (let i = 0; i < len; i++) {
        let pos = Math.floor(Math.random() * chrs.length)
        str += chrs.substring(pos, pos+1)
    }
    return str
}

module.exports.idFromToken = (header) => {
    const token = header.split(' ', 2)[1]
    return jwt.verify(token, config.jwt,(err, verifiedJwt) => {
        if (err) {
            return {status: false, result: err}
        } else {
            return {status: true, result: verifiedJwt.userId}
        }
    })
}
