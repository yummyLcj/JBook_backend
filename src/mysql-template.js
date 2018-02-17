/**
 * @Author: chenjie.lu
 * @Date:   2018-02-17T09:37:33+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-17T09:38:27+08:00
 */
const Sequelize = require('sequelize');

const config = {
    database: '',
    username: '',
    password: '',
    host: '',
    port: 3306
};

module.exports = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
