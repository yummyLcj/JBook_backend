// base on /records
const Router = require('koa-router');

const router = new Router({
    prefix: '/records',
});
module.exports = router
    // 获取全部账单列表
    .get('/:uid/:aid', async (ctx, next) => {
        const {
            aid,
            uid,
        } = ctx.getParams(['aid', 'uid']);
        const {
            limit = 10,
            page = 1,
        } = ctx.getParams();
        const canWrite = await ctx.model.userToAccount.findOne({
            where: {
                uid,
                aid,
            },
        });
        if (!canWrite) {
            ctx.goError({
                message: '无权限！',
            });
            await next();
            return;
        }
        const recordsList = await ctx.model.records.findAll({
            offset: (page - 1) * limit,
            limit: +limit,
            where: {
                aid,
            },
            include: [
                {
                    model: ctx.model.types,
                }, {
                    model: ctx.model.users,
                    as: 'creater',
                }, {
                    model: ctx.model.users,
                    as: 'editer',
                },
            ],
            order: ['records.time DESC'],
        });
        ctx.goSuccess({
            data: {
                length: recordsList.length,
                page,
                data: recordsList,
            },
        });
        await next();
    });
