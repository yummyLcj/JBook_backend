// base on /accounts
const Router = require('koa-router');

const router = new Router({
    prefix: '/accounts',
});
module.exports = router
    // 获取全部账单列表
    .get('/:uid', async (ctx, next) => {
        const { uid } = ctx.getParams(['uid']);
        const accountsList = await ctx.model.userToAccount.findAll({
            where: {
                uid,
            },
        });
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    });
