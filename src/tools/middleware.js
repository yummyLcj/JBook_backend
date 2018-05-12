// const schedule = require('node-schedule');

const isFieldNotExist = function (data = [], mustExistField = []) {
    const emptyKey = [];
    mustExistField.forEach((field) => {
        if (data[field] === undefined) {
            emptyKey.push(field);
        }
    });
    return emptyKey;
};

// this指针绑定为ctx
const go = function (content) {
    const body = JSON.parse(this.body || '{}');
    if (body.success === false) {
        return false;
    }
    this.body = JSON.stringify(content);
    return true;
};

// 返回成功
const goSuccess = function (content = {}) {
    const goContent = content;
    goContent.success = true;
    go.call(this, goContent);
    return true;
};

// 返回失败
const goError = function (content = {}) {
    const goContent = content;
    goContent.success = false;
    go.call(this, goContent);
    return true;
};

// 定时任务
const timeMask = function (cb = () => false, sec = '*', min = '*', hour = '*', day = '*', month = '*', year = '*', week = '*') {
    // schedule.scheduleJob(`${sec} ${min} ${hour} ${day} ${month} ${year} ${week}`, cb);
};

// 获取传递的参数
const getParams = function (mustExistField = []) {
    const ctx = this;
    let params = {};
    switch (ctx.method.toLowerCase()) {
    case 'get':
        params = ctx.query;
        break;
    case 'post':
        params = ctx.request.body;
        break;
    case 'put':
        params = ctx.request.body;
        break;
    case 'delete':
        params = ctx.request.body;
        break;
    default:
        params = {};
    }
    Object.assign(params, ctx.params);
    const emptyKeys = isFieldNotExist(params, mustExistField);
    if (emptyKeys.length) {
        goError.call(this, {
            content: `参数${JSON.stringify(emptyKeys)}错误！不可为空！`,
        });
        return false;
    }
    return params;
};

const makeId = function (baseId = '') {
    return `${Math.floor((+new Date()) * Math.random())}${baseId}`.toString(16).slice(0, 8);
};

module.exports = {
    go,
    goSuccess,
    goError,
    getParams,
    makeId,
    timeMask,
};
