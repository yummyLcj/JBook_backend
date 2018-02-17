/**
 * @Author: chenjie.lu
 * @Date:   2018-02-15T15:04:45+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-17T09:23:33+08:00
 */

const Router = require('koa-router');

const router = new Router();

module.exports = router
    .get('/', (ctx) => {
        // ctx.router available
        ctx.body = 'router';
    })
    .get('/hello', (ctx) => {
        ctx.body = 'hellow';
    });
