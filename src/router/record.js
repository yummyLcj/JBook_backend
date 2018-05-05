// base on /account
const Router = require('koa-router');

const router = new Router({
    prefix: '/record',
});
module.exports = router
    // 获取记录具体信息
    .get('/:rid', async (ctx, next) => {
        const { rid } = ctx.getParams(['rid']);
        const accountsList = await ctx.model.records.findAll({
            where: {
                rid,
            },
        });
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    })
    // 创建一条记录
    .post('/:aid', async (ctx, next) => {
        const {
            aid,
            uid,
            amount,
            balanceType,
            type,
            note,
        } = ctx.getParams(['aid', 'uid', 'amount']);
        const record = await ctx.model.records.create({
            rid: ctx.makeId(aid),
            aid,
            createrId: uid,
            editerId: uid,
            balanceType,
            type,
            amount,
            note,
        });
        ctx.goSuccess({
            data: record,
        });
        await next();
    })
    // 修改一条记录
    .put('/:rid', async (ctx, next) => {
        const {
            rid,
            aid,
            uid,
            amount,
            balanceType,
            type,
            note,
        } = ctx.getParams(['rid', 'uid', 'aid', 'amount']);
        ctx.model.records.update({
            aid,
            editerId: uid,
            balanceType,
            type,
            amount,
            note,
        }, {
            where: {
                rid,
            },
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    })
    // 删除一条记录
    .del('/:aid/:rid', async (ctx, next) => {
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
