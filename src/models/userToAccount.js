/**
 * @Author: chenjie.lu
 * @Date:   2018-02-18T10:08:54+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-18T15:52:31+08:00
 */
const db = require('../db');
const users = require('./users.js');
const accounts = require('./accounts.js');

module.exports = db.defineModel('userToAccount', {
    id: {
        type: db.STRING(16),
        unique: true,
    },
    aid: {
        type: db.STRING(16),
        ureferences: {
            model: accounts,
            key: 'id',
        },
    },
    uid: {
        type: db.STRING(32),
        references: {
            model: users,
            key: 'id',
        },
    },
    accountName: {
        type: db.STRING(16),
        unique: false,
    },
    isDefault: {
        type: db.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});
