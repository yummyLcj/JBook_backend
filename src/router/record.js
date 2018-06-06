// base on /account
const Router = require('koa-router');

const router = new Router({
    prefix: '/record',
});
module.exports = router
    // 获取记录具体信息
    .get('/:rid', async (ctx, next) => {
        const { rid } = ctx.getParams(['rid']);
        if (!rid) {
            await next();
            return;
        }
        const record = await ctx.model.records.findAll({
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
        const users = await ctx.model.userToRecord.findAll({
            where: {
                rid,
            },
            include: [
                {
                    model: ctx.model.users,
                },
            ],
        });
        ctx.goSuccess({
            data: record,
            users,
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
        if (!aid || !uid || !amount || !time) {
            await next();
            return;
        }
        let { uids } = ctx.getParams();
        uids = uids || [uid];
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
        await uids.forEach((_uid) => {
            ctx.model.userToRecord.create({
                rid: record.dataValues.rid,
                uid: _uid,
            });
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
        if (!aid || !uid || !amount || !time) {
            await next();
            return;
        }
        let { uids } = ctx.getParams();
        uids = uids || [uid];
        await ctx.model.records.update({
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
        await uids.forEach((_uid) => {
            ctx.model.userToRecord.upsert({
                rid,
                uid,
            }, {
                rid,
                uid: _uid,
            }, {
                where: {
                    rid,
                },
            });
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
        if (!aid || !rid) {
            await next();
            return;
        }
        ctx.model.records.update({
            isDelete: true,
        }, {
            where: {
                rid,
                aid,
            },
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    });
