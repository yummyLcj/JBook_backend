// base on /user
const Router = require('koa-router');
const config = require('../../config');
const WXBizDataCrypt = require('../tools/WXBizDataCrypt');

const router = new Router({
    prefix: '/user'
});
module.exports = router
    .post('/', (ctx) => {
        const { body } = ctx.request;
        const { appid } = config;
        const { sessionKey, encryptedData, iv } = body;
        const pc = new WXBizDataCrypt(appid, sessionKey);
        const data = pc.decryptData(encryptedData, iv);
        ctx.body = 'router';
    });
