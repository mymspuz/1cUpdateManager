const Sequalize = require('sequelize')
const sequelize = require('../utils/sequelize_connect')

const User = sequelize.define('users', {
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true
    },
    login: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequalize.STRING,
        allowNull: false
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: Sequalize.STRING,
        allowNull: false,
        validate: {
            isIn: [['admin', 'member']]
        }
    },
    confirmed: {
        type: Sequalize.BOOLEAN,
        allowNull: false
    },
    confirmed_code: {
        type: Sequalize.STRING,
        allowNull: false
    }
})

module.exports = User