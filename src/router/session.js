// base on /session
const Router = require('koa-router');
const fetch = require('node-fetch');
const config = require('../../config');

const router = new Router({
    prefix: '/session'
});
module.exports = router
    // 登录
    .post('/', async (ctx, next) => {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`;
        const loginInf = await fetch(url)
            .then(res => (res.json()));
        // loginInf: session_key openid unionid
        ctx.body = JSON.stringify({
            needLogin: !loginInf.unionid,
            sessionKey: loginInf.session_key,
            uid: loginInf.openid
        });
        await next();
    });
