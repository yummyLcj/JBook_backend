// base on /account
const Router = require('koa-router');

const router = new Router({
    prefix: '/record',
});
module.exports = router
    // 获取记录具体信息
    .get('/:aid', async (ctx, next) => {
        const { rid } = ctx.getParams(['rid']);
        const accountsList = await ctx.model.records.findAll({
            where: {
                id: rid,
            },
        });
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    })
    // 创建一条记录
    .post('/:uid', async (ctx, next) => {
        const {
            rid,
            aid,
            uid,
            amount,
            type,
            note,
        } = ctx.getParams(['rid, aid, uid, amount']);
        ctx.model.records.create({
            id: rid,
            aid,
            createrId: uid,
            type,
            amount,
            note,
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    })
    // 修改一条记录
    .post('/:uid', async (ctx, next) => {
        const {
            rid,
            aid,
            uid,
            amount,
            type,
            note,
        } = ctx.getParams(['rid, uid, aid, amount']);
        ctx.model.records.create({
            id: rid,
            aid,
            editerId: uid,
            type,
            amount,
            note,
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    })
    // 删除一条记录
    .del('/:uid/:aid', async (ctx, next) => {
        const {
            rid,
            aid,
        } = ctx.getParams(['rid', 'aid']);
        ctx.model.records.destroy({
            where: {
                id: rid,
                aid,
            },
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    });
