/**
 * @Author: chenjie.lu
 * @Date:   2018-02-18T10:08:54+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-18T15:52:31+08:00
 */
const db = require('../db');
const users = require('./users.js');

module.exports = db.defineModel('accounts', {
    id: db.STRING(16),
    aid: {
        type: db.STRING(16),
        unique: true,
        primaryKey: true,
    },
    createrId: {
        type: db.STRING(32),
        references: {
            model: users,
            key: 'id',
        },
    },
    accountName: {
        type: db.STRING(16),
        allowNull: false,
    },
    // 0 - 普通 1 - AA
    type: {
        type: db.FLOAT,
        allowNull: true,
    },
});
