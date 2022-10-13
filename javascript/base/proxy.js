const target = {}
const handler = {
    get(target, key, recevier) {
        return target[key]
    },
    set(target, key, val, recevier) {
        target[key] = val
        return true
    }
}
const proxy = new Proxy(target, handler)
proxy.a=2
console.log(proxy,target)
