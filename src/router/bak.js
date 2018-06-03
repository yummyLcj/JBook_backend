// base on /bak
const Router = require('koa-router');
const sequelize = require('sequelize');
const fs = require('fs');

const { Op } = sequelize;
const router = new Router({
    prefix: '/bak',
});

module.exports = router
    .get('/:aid', async (ctx, next) => {
        const {
            aid,
        } = ctx.getParams(['aid']);
        if (!aid) {
            await next();
            return;
        }
        const records = await ctx.model.records.findAll({
            where: {
                aid,
            },
        });
        const fileName = `./src/userAccounts/aid${+new Date() * Math.random()}.json`;
        fs.writeFileSync(fileName, JSON.stringify(records));
        const file = fs.readFileSync(fileName);
        ctx.body = file;
        await next();
    });
