const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
        require: true,
        rejectUnauthorized: false
        }
    }
    }
);


export const sequelizeConnection = async () => {
    try {
        sequelize
        .authenticate()
        .then(() => {
            console.log('Postgres connection has been established successfully.')
    })
    } catch (error) {
    console.error('Unable to connect to the database:', error)
}}

export const Invoice = sequelize.define('Invoice', {
    // Model attributes are defined here
        txid: {
        type: DataTypes.STRING,
        allowNull: false
        },
        payer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipient: {
        type: DataTypes.STRING,
        allowNull: false
        },
        amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
        },
        mint: {
            type: DataTypes.STRING,
            allowNull: false
        },
        label: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        },
        memo: {
            type: DataTypes.STRING,
        },
    }, {
    // Other model options go here
    })