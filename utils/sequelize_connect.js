const Sequelize = require('sequelize')
const paramConnect = require('../config/keys')

const sequelize = new Sequelize(
                                    paramConnect.dbName,
                                    paramConnect.dbUser,
                                    paramConnect.dbPassword,
                                    {
                                        host: paramConnect.dbHost,
                                        dialect: paramConnect.dbDialect,
                                        pool: {
                                            max: 5,
                                            min: 0,
                                            acquire: 30000,
                                            idle: 10000
                                        },
                                        define: {
                                            timestamps: false
                                        }
                                    }
                                )

module.exports = sequelize