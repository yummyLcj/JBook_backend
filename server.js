/**
 * @Author: chenjie.lu
 * @Date:   2018-02-15T13:57:26+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-18T16:33:06+08:00
 */

const Koa = require('koa');
const router = require('./src/router.js');
const user = require('./src/models/users.js');

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
