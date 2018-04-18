const isFieldNotExist = function (data = [], mustExistField = []) {
    let isNotExist = false;
    mustExistField.forEach((field) => {
        isNotExist = isNotExist ? true : !data[field];
        return isNotExist;
    });
    return isNotExist;
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

// 获取传递的参数
const getParams = function (mustExistField = []) {
    const ctx = this;
    let params = {};
    switch (ctx.method) {
    case 'get':
        params = ctx.query;
        break;
    case 'post':
        params = ctx.request.body;
        break;
    default:
        params = {};
    }
    params = Object.assign(params, ctx.params);
    if (mustExistField.length && isFieldNotExist(params, mustExistField)) {
        goError.call(this, {
            content: '参数错误！不可为空！',
        });
        return false;
    }
    return params;
};

module.exports = {
    go,
    goSuccess,
    goError,
    getParams,
};
