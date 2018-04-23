// base on /accounts
const Router = require('koa-router');

const router = new Router({
    prefix: '/accounts',
});
module.exports = router
    // 获取全部账单列表
    .get('/:uid', async (ctx, next) => {
        const { uid } = ctx.getParams(['uid']);
        const accountsList = await ctx.model.userToAccount.findAll({
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
            });
            accountsList.push(account);
        }
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    });
