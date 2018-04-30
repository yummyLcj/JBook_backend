// base on /accounts
const Router = require('koa-router');

const router = new Router({
    prefix: '/accounts',
});
module.exports = router
    // 获取全部账单列表，没有则创建默认账单
    .get('/:uid', async (ctx, next) => {
        const { uid } = ctx.getParams(['uid']);
        let {
            page,
            limit,
        } = ctx.getParams();
        limit = limit || 20;
        page = page || 1;
        const accountsList = await ctx.model.userToAccount.findAll({
            offset: (page - 1) * limit,
            limit,
            where: {
                uid,
            },
        });
        if (accountsList.length === 0) {
            let account = await ctx.model.accounts.create({
                createrId: uid,
                accountName: '默认账单',
                type: 1,
            });
            account = await ctx.model.userToAccount.create({
                aid: account.id,
                uid,
                accountName: account.accountName,
                isDefault: true,
                access: 0,
            });
            accountsList.push(account);
        }
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    });
