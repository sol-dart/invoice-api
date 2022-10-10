"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = exports.sequelizeConnection = exports.sequelize = void 0;
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
exports.sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const sequelizeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        exports.sequelize
            .authenticate()
            .then(() => {
            console.log('Postgres connection has been established successfully.');
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.sequelizeConnection = sequelizeConnection;
exports.Invoice = exports.sequelize.define('Invoice', {
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
});
