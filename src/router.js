/**
 * @Author: chenjie.lu
 * @Date:   2018-02-15T15:04:45+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-17T09:23:33+08:00
 */

const Router = require('koa-router');
const sessionRouter = require('./router/session');
const userRouter = require('./router/user');
const accountsRouter = require('./router/accounts');
const accountRouter = require('./router/account');
const recordsRouter = require('./router/records');
const recordRouter = require('./router/record');

const router = new Router();

module.exports = router
    .use('', sessionRouter.routes())
    .use('', userRouter.routes())
    .use('', accountsRouter.routes())
    .use('', accountRouter.routes())
    .use('', recordsRouter.routes())
    .use('', recordRouter.routes());
