/**
 * @Author: chenjie.lu
 * @Date:   2018-02-18T10:08:54+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-18T15:52:31+08:00
 */
const db = require('../db');
const { makeId } = require('../tools/middleware.js');

const users = db.defineModel('users', {
    id: db.STRING(16),
    uid: {
        type: db.STRING(32),
        unique: true,
        primaryKey: true,
    },
    name: {
        type: db.STRING(16),
        allowNull: false,
    },
});

users.addHook('afterCreate', async (user) => {
    const accounts = require('./accounts.js');
    const userToTypes = require('./userToTypes.js');
    await accounts.create({
        aid: makeId(user.uid),
        createrId: user.uid,
        accountName: '默认账本',
        type: 1,
    });
    await userToTypes.create({
        tid: 1,
        uid: user.uid,
    });
});

module.exports = users;
