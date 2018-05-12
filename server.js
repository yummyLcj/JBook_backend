/**
 * @Author: chenjie.lu
 * @Date:   2018-02-15T13:57:26+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-03-04T11:10:49+08:00
 */
const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./src/router.js');
const model = require('./src/model.js');
const {
    getParams,
    go,
    goSuccess,
    goError,
    makeId,
    // timeMask,
} = require('./src/tools/middleware.js');
const { types } = require('./dataConfig.js');

const PORT = 3000;
const app = new Koa();
const env = process.env.NODE_ENV;
if (env === 'refreshSql') {
    // 更新数据库，正式环境删除
    model
        .sync()
        .then(async () => {
            await model.users.create({
                uid: 1,
                name: 'lcj',
            });
            const account = await model.accounts.create({
                aid: makeId(1),
                createrId: 1,
                accountName: 'test',
                type: 0,
            });
            for (let i = 0; i < 10; i++) {
                model.records.create({
                    rid: makeId(account.aid),
                    aid: account.aid,
                    createrId: 1,
                    editerId: 2,
                    balanceType: 0,
                    tid: 1,
                    amount: 0,
                    time: new Date(),
                    note: 'this is test',
                });
            }
            await types.forEach(async (item) => {
                await model.types.create({
                    tid: makeId(1),
                    createrId: 1,
                    name: item.name,
                    type: item.type,
                    code: item.code,
                });
            });
            await model.users.create({
                uid: 2,
                name: 'lcj2',
            });
        });
}

app.use(koaBody({
    multipart: true,
})).use(async (ctx, next) => {
    ctx.model = model;
    ctx.getParams = getParams.bind(ctx);
    ctx.go = go.bind(ctx);
    ctx.goSuccess = goSuccess.bind(ctx);
    ctx.goError = goError.bind(ctx);
    ctx.makeId = makeId;
    // ctx.timeMask = timeMask;
    await next();
}).use(router.routes()).use(router.allowedMethods());
app.listen(PORT);

console.log(`Server is listen on Port ${PORT}`);
