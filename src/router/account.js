// base on /account
const Router = require('koa-router');

const router = new Router({
    prefix: '/account',
});
module.exports = router
    // 获取账单具体信息
    .get('/:aid', async (ctx, next) => {
        const { aid } = ctx.getParams(['aid']);
        const accountsList = await ctx.model.accounts.findAll({
            where: {
                id: aid,
            },
        });
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    })
    // 创建一本账单
    .post('/:uid', async (ctx, next) => {
        const {
            uid,
            accountName,
            type,
        } = ctx.getParams(['uid, accountName']);
        ctx.model.accounts.create({
            uid,
            accountName,
            type,
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    })
    // 删除一本账单
    .del('/:uid/:aid', async (ctx, next) => {
        const {
            uid,
            aid,
        } = ctx.getParams(['uid', 'aid']);
        ctx.model.accounts.destroy({
            where: {
                uid,
                id: aid,
            },
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    });
