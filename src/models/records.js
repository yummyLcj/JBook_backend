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
    id: db.STRING(16),
    rid: {
        type: db.STRING(16),
        unique: true,
        primaryKey: true,
    },
    aid: {
        type: db.STRING(16),
        references: {
            model: accounts,
            key: 'aid',
        },
    },
    createrId: {
        type: db.STRING(32),
        references: {
            model: users,
            key: 'uid',
        },
    },
    editerId: {
        type: db.STRING(32),
        references: {
            model: users,
            key: 'uid',
        },
    },
    amount: {
        type: db.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    // 0 收入 1 支出
    balanceType: {
        type: db.INTEGER,
        allowNull: false,
    },
    type: {
        type: db.INTEGER,
        allowNull: false,
    },
    note: {
        type: db.STRING,
        allowNull: true,
        defaultValue: '',
    },
});
