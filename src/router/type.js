// base on /type
const Router = require('koa-router');

const router = new Router({
    prefix: '/type',
});
module.exports = router
    // 获取记录具体信息
    .get('/:tid', async (ctx, next) => {
        const { tid } = ctx.getParams(['tid']);
        const typeList = await ctx.model.types.findAll({
            where: {
                tid,
            },
        });
        ctx.goSuccess({
            data: typeList,
        });
        await next();
    })
    // 创建一条记录
    .post('/:uid', async (ctx, next) => {
        const {
            name,
            uid,
        } = ctx.getParams(['name', 'uid']);
        await ctx.model.types.create({
            tid: ctx.makeId(uid),
            createId: uid,
            name,
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    })
    // 获取记录具体信息
    .put('/:tid', async (ctx, next) => {
        const { tid, name } = ctx.getParams(['tid', 'name']);
        const typeList = await ctx.model.types.update({
            name,
        }, {
            where: {
                tid,
            },
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    })
    // 删除一条记录
    .del('/:uid/:tid', async (ctx, next) => {
        const {
            tid,
            uid,
        } = ctx.getParams(['uid', 'tid']);
        ctx.model.records.destroy({
            where: {
                tid,
                uid,
            },
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    });
