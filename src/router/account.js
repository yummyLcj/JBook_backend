// base on /account
const Router = require('koa-router');

const router = new Router({
    prefix: '/account',
});

const getAccountDetail = async function (ctx, aid, uid) {
    const accountDetail = await ctx.model.accounts.findOne({
        where: {
            aid,
        },
        order: [
            ['updatedAt', 'DESC'],
        ],
    });
    const userToAccount = await ctx.model.userToAccount.findOne({
        where: {
            aid,
            uid,
        },
    });
    accountDetail.isDefault = userToAccount.isDefault;
    accountDetail.access = userToAccount.access;
    return accountDetail;
};

module.exports = router
    // 获取账单具体信息
    .get('/:aid', async (ctx, next) => {
        const {
            aid,
            uid,
        } = ctx.getParams(['aid, uid']);
        const accountDetail = await getAccountDetail(ctx, aid, uid);
        ctx.goSuccess({
            data: accountDetail,
        });
        await next();
    })
    // 创建一本账单
    .post('/:uid', async (ctx, next) => {
        const {
            uid,
            accountName,
            type,
        } = ctx.getParams(['uid', 'accountName']);
        const accountDetail = await ctx.model.accounts.create({
            createrId: uid,
            accountName,
            type,
        });
        await ctx.model.userToAccount.create({
            aid: accountDetail.id,
            uid,
            accountName,
            isDefault: false,
            access: 0,
        });
        accountDetail.isDefault = false;
        accountDetail.access = 0;
        ctx.goSuccess({
            data: accountDetail,
        });
        await next();
    })
    // 修改一本账单
    .put('/:aid', async (ctx, next) => {
        const {
            aid,
            uid,
            accountName,
            type,
            isDefault = false,
            access = 0,
        } = ctx.getParams(['uid', 'accountName']);
        const originAccountDetail = await getAccountDetail(ctx, aid, uid);
        // 仅为可读权限
        if (originAccountDetail.access === 3) {
            ctx.goError({
                message: '无权限！',
            });
            await next();
            return;
        }
        const accountDetail = await ctx.model.accounts.upsert({
            createrId: uid,
            accountName: accountName || originAccountDetail.accountName,
            type: type || originAccountDetail.type,
        });
        await ctx.model.userToAccount.upsert({
            aid: accountDetail.id,
            uid,
            accountName: accountName || originAccountDetail.accountName,
            isDefault: isDefault || originAccountDetail.isDefault,
            access: access || originAccountDetail.access,
        });
        accountDetail.isDefault = false;
        accountDetail.access = 0;
        ctx.goSuccess({
            data: accountDetail,
        });
        await next();
    })
    // 删除一本账单
    .del('/:aid', async (ctx, next) => {
        const {
            uid,
            aid,
        } = ctx.getParams(['uid', 'aid']);
        const originAccountDetail = await getAccountDetail(ctx, aid, uid);
        // 仅为可读权限
        if (originAccountDetail.access !== 0) {
            ctx.goError({
                message: '无权限！',
            });
            await next();
            return;
        }
        await ctx.model.accounts.destroy({
            where: {
                uid,
                id: aid,
            },
        });
        await ctx.model.userToAccount.destroy({
            where: {
                uid,
                id: aid,
            },
        });
        ctx.goSuccess({
            data: 'success',
        });
        await next();
    });
