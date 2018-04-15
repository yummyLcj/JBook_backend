// base on /session
const Router = require('koa-router');

const router = new Router({
    prefix: '/accounts',
});
module.exports = router
    // 获取全部账单列表
    .get('/:uid', async (ctx, next) => {
        const { uid } = await ctx.getParams(['uid']);
        const accountsList = await ctx.model.userToAccount.findAll({
            where: {
                uid,
            },
        });
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    })
    // 创建一本账单
    .post('/:uid', async (ctx, next) => {
        ctx.model.userToAccount.create({
            uid: ctx.params.uid,
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    })
    // 删除一本账单
    .del('/:uid/:aid', async (ctx, next) => {
        ctx.model.userToAccount.destroy({
            where: {
                uid: ctx.params.uid,
                id: ctx.params.aid,
            },
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    });
