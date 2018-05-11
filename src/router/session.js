// base on /session
const Router = require('koa-router');
const fetch = require('node-fetch');
const config = require('../../config');

const router = new Router({
    prefix: '/session',
});

module.exports = router
    // 登录
    .post('/', async (ctx, next) => {
        const {
            code,
            name,
        } = ctx.getParams(['code', 'name']);
        if (!code || !name) {
            return;
        }
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${code}&grant_type=authorization_code`;
        const loginInf = await fetch(url)
            .then(res => (res.json()));
        const uid = loginInf.openid;
        await ctx.model.users.findOrCreate({
            where: {
                uid,
                name,
            },
            defaults: {
                uid,
                name,
            },
        });
        ctx.body = JSON.stringify({
            uid,
            name,
        });
        await next();
    });
