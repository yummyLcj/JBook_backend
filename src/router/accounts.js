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
        });
        if (accountsList.length === 0) {
            const account = await ctx.model.accounts.create({
                aid: ctx.makeId(uid),
                createrId: uid,
                accountName: '默认账单',
                type: 1,
            });
            accountsList.push(account);
        }
        ctx.goSuccess({
            data: accountsList,
        });
        await next();
    });
