const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const config = require('../config/keys')
const transporter = require('../utils/mailSend')
const sysUtils = require('../utils/sysUtils')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({
        where: {
            [Op.or]: [
                {email: req.body.login},
                {login: req.body.login}
            ]
        }
    })

    if (candidate) {
        if (!candidate.confirmed) {
            return res.status(401).json({
                message: 'You not confirmed'
            })
        }
        const passwordCompare = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordCompare) {
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate.id
            }, config.jwt, {expiresIn: 3600})
            res.status(200).json({
                token
            })
        } else {
            res.status(401).json({
                message: 'Password incorrect'
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({
        where: {
            [Op.or]: [
                {email: req.body.email},
                {login: req.body.login}
            ]
        }
    })
    .then()
    .catch(error => {
        errorHandler(res, error)
    })
    if (candidate) {
        let message = ''
        if (candidate.login === req.body.login) {
            message += 'Login already exists! '
        }
        if (candidate.email === req.body.email) {
            message += 'Email already exists!'
        }
        res.status(409).json({
            message
        })
    } else {
        const salt = bcrypt.genSaltSync(12)
        const confirmedStr = sysUtils.str_gen(15)
        const user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, salt),
            email: req.body.email,
            role: 'member',
            confirmed: false,
            confirmed_code: confirmedStr
        })
        try {
            const result = await transporter.sendMail({
                from: `"1CUpdateManager" <${config.mailAdress}>`,
                to: `"${req.body.email}"`,
                subject: "Message from 1CUpdateManager",
                text: `This message was sent from 1CUpdateManager server - /confirmed?login=${req.body.login}&confirmed_code=${confirmedStr}`
                //html: `This <a href="/confirmed?login=${req.body.login}&confirmed_code=${confirmedStr}">confirm...</a> was sent from <strong>1CUpdateManager</strong> server.`
            })
            await user.save()
            res.status(200).json(user)
        }
        catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.confirmed = async (req, res) => {
    const confirmedParams =  req.query
    if (confirmedParams.login && confirmedParams.confirmed_code) {
        const candidate = await User.findOne({
                                    where: {
                                        login: confirmedParams.login,
                                        confirmed_code: confirmedParams.confirmed_code
                                    }
                                })
                                .then()
                                .catch(error => {
                                    errorHandler(res, error)
                                })
        if (candidate) {
            User.update({
                    confirmed: true,
                    confirmed_code: ''
                },
                {
                    where: {
                        login: confirmedParams.login
                    }
                })
                .then(
                    res.status(200).json({
                        message: 'Confirmed successful.'
                    })
                )
                .catch(error => {
                    errorHandler(res, error)
                })
        } else {
            res.status(409).json({
                message: 'Confirmation error'
            })
        }
    } else {
        res.status(409).json({
            message: 'Confirmation error'
        })
    }
}