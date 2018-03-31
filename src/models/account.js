/**
 * @Author: chenjie.lu
 * @Date:   2018-02-18T10:08:54+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-18T15:52:31+08:00
 */
const db = require('../db');
const users = require('./users.js');

module.exports = db.defineModel('account', {
    id: {
        type: db.STRING(16),
        unique: false
    },
    uid: {
        type: db.STRING(16),
        references: {
            model: users,
            key: 'id'
        }
    },
    amount: {
        type: db.INTEGER,
        unique: true
    }
});
