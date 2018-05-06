// base on /session
const Router = require('koa-router');
const fetch = require('node-fetch');
const config = require('../../config');

const router = new Router({
    prefix: '/session',
});

const sleep = function (time) {
    return Promise((resolve) => {
        setTimeout(() => resolve(), time);
    });
};

module.exports = router
    // 登录
    .post('/', async (ctx, next) => {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`;
        const loginInf = await fetch(url)
            .then(res => (res.json()));
        const uid = loginInf.openid;
        await ctx.model.users.findOrCreate({
            where: {
                uid,
            },
            defaults: {
                uid,
            },
        });
        ctx.body = JSON.stringify({
            uid,
        });
        await next();
    });
