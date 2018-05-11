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
        });
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    })
    // 创建一条记录
    .post('/:uid/:aid', async (ctx, next) => {
        const {
            aid,
            uid,
            amount,
            balanceType,
            tid,
            note,
            time,
        } = ctx.getParams(['aid', 'uid', 'amount', 'time']);
        if (!aid || !uid || !amount) {
            return;
        }
        const record = await ctx.model.records.create({
            rid: ctx.makeId(aid),
            aid,
            createrId: uid,
            editerId: uid,
            balanceType,
            tid,
            amount,
            time,
            note,
        });
        ctx.goSuccess({
            data: record,
        });
        await next();
    })
    // 修改一条记录
    .put('/:aid/:rid', async (ctx, next) => {
        const {
            rid,
            aid,
            uid,
            amount,
            balanceType,
            tid,
            note,
            time,
        } = ctx.getParams(['rid', 'uid', 'aid', 'amount']);
        ctx.model.records.update({
            aid,
            editerId: uid,
            balanceType,
            tid,
            amount,
            note,
            time,
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
