Function.prototype.myBind = function (context, ...arg) {
    const _this = this
    return function F(..._arg) {
        if (this instanceof F) return new _this(...arg, ..._arg)
        return _this.apply(context, [...arg, ..._arg])
    }
}
Function.prototype.myBind1 = function (context, ...arg) {
    const ctx = context || window
    const fn = Symbol()
    ctx[fn] = this
    return function (..._arg) {
        const result = ctx[fn](...arg, ..._arg)
        delete ctx[fn]
        return result
    }
}
Function.prototype.myApply = function (context, arg) {
    const ctx = context || window
    ctx.fn = this
    const result = Array.isArray(arg) ? ctx.fn(...arg) : ctx.fn()
    delete ctx.fn
    return result;
}
Function.prototype.myCall = function (context, ...arg) {
    const ctx = context || window
    ctx.fn = this
    const result = ctx.fn(...arg)
    delete ctx.fn
    return result;
}

function myNew(constructor) {
    const obj={}
    obj.__proto__=constructor.prototype
    constructor.apply(obj)
    return obj
}