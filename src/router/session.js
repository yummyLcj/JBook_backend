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
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`;
        const loginInf = await fetch(url)
            .then(res => (res.json()));
        const Users = ctx.model.users;
        Users.findOrCreate({
            where: {
                id: loginInf.openid,
            },
        });
        ctx.body = JSON.stringify({
            uid: loginInf.openid,
        });
        await next();
    });
