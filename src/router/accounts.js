// base on /accounts
const Router = require('koa-router');

const router = new Router({
    prefix: '/accounts',
});

module.exports = router
    // 获取全部账单列表，没有则创建默认账单，取全部账单
    .get('/:uid', async (ctx, next) => {
        const { uid } = ctx.getParams(['uid']);
        const accountsList = await ctx.model.userToAccount.findAll({
            where: {
                uid,
            },
            include: [
                {
                    model: ctx.model.accounts,
                },
            ],
        });
        if (accountsList.length === 0) {
            const userInfo = await ctx.model.users.findOne({
                where: {
                    uid,
                },
            });
            const account = await ctx.model.accounts.create({
                aid: ctx.makeId(uid),
                createrId: uid,
                accountName: `${userInfo.name}的默认账单`,
                type: 1,
            });
            accountsList.push(account);
        }
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    })
    .post('/:uid/:aid', async (ctx, next) => {
        const {
            uid,
            aid,
            source,
        } = ctx.getParams(['uid', 'aid', 'source']);
        if (!uid || !aid || !source) {
            return;
        }
        const hasSource = await ctx.model.userToAccount.findOne({
            where: {
                aid,
                source,
            },
        });
        if (hasSource) {
            ctx.goError({
                data: '一个链接仅可注册一个用户！',
            });
            await next();
            return;
        }
        ctx.model.userToAccount.create({
            isDefault: false,
            access: 2,
            source,
            aid,
            uid,
        });
        await next();
    });
