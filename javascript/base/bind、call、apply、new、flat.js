//使用apply版本
Function.prototype.myBind = function (context, ...arg) {
    const _this = this
    return function F(..._arg) {
        if (this instanceof F) return new _this(...arg, ..._arg)
        return _this.apply(context, [...arg, ..._arg])
    }
}
//不使用apple版本
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

// call的性能比apply好，尤其是在传递给函数的参数超过三个的时候
function myNew(constructor) {
    if (!constructor.prototype) {
        throw new Error("不是函数")
    }
    const obj = {}
    obj.__proto__ = constructor.prototype
    const result = constructor.apply(obj)
    const isObj = typeof result === 'object' && !!result
    const isFnc = typeof result === 'function'
    return isFnc || isObj ? result : obj
}

Function.prototype.myNew = function (...arg) {
    const obj = Object.create(this.prototype)
    const result = this.apply(obj, arg)
    return typeof result === 'object' && result !== null ? result : obj
}
Function.prototype.myCreate = function (obj) {
    const f = function () {
    }
    f.prototype = obj
    return new f()
}

function myInstanceof(left, right) {
    let prototype = right.prototype
    let leftProto = left.__proto__
    while (true) {
        if (leftProto === null) {
            return false;
        }
        if (leftProto === prototype) {
            return true;
        }
        leftProto = leftProto.__proto__
    }
}

Array.prototype.myFlat = function (level = 1) {
    return this.reduce((prev, curr) => {
        if (Array.isArray(curr)) {
            return prev.concat(level ? curr.myFlat(level - 1) : curr)
        } else {
            return prev.concat(curr)
        }
    }, [])
}
