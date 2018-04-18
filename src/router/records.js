// base on /records
const Router = require('koa-router');

const router = new Router({
    prefix: '/records',
});
module.exports = router
    // 获取全部账单列表
    .get('/:aid', async (ctx, next) => {
        const { aid } = ctx.getParams(['aid']);
        const recordsList = await ctx.model.records.findAll({
            where: {
                aid,
            },
        });
        ctx.goSuccess({
            data: recordsList,
        });
        await next();
    });
