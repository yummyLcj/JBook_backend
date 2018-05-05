// base on /accounts
const Router = require('koa-router');

const router = new Router({
    prefix: '/types',
});
module.exports = router
    // 获取全部账单列表，没有则创建默认账单，取全部账单
    .get('/:uid', async (ctx, next) => {
        const { uid } = ctx.getParams(['uid']);
        const typesList = await ctx.model.userToTypes.findAll({
            where: {
                uid,
            },
            include: [
                {
                    model: ctx.model.types,
                },
            ],
        });
        ctx.goSuccess({
            data: typesList,
        });
        await next();
    });
