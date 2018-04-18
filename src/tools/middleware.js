const isFieldNotExist = function (data = [], mustExistField = []) {
    const emptyKey = [];
    mustExistField.forEach((field) => {
        if (!data[field]) {
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

module.exports = {
    go,
    goSuccess,
    goError,
    getParams,
};
