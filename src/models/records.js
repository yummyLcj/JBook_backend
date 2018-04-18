/**
 * @Author: chenjie.lu
 * @Date:   2018-04-16T10:08:54+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-18T15:52:31+08:00
 */
const db = require('../db');
const users = require('./users.js');
const accounts = require('./accounts.js');

module.exports = db.defineModel('records', {
    id: {
        type: db.STRING(16),
        unique: false,
    },
    aid: {
        type: db.STRING(16),
        references: {
            model: accounts,
            key: 'id',
        },
    },
    createrId: {
        type: db.STRING(32),
        references: {
            model: users,
            key: 'id',
        },
    },
    editerId: {
        type: db.STRING(32),
        references: {
            model: users,
            key: 'id',
        },
    },
    amount: db.FLOAT,
    type: {
        type: db.INTEGER,
        allowNull: true,
    },
    note: {
        type: db.STRING,
        allowNull: true,
    },
});
