class EventEmitter {
    constructor(maxListener = 10) {
        this.listeners = {}
        this.maxListener = maxListener
    }

    /**
     * 订阅
     * @param event
     * @param cb
     */
    on(event, cb) {
        if (this.listeners[event]?.length >= this.maxListener) {
            throw ('超出最大监听限制')
        }
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].push(cb)
        } else {
            this.listeners[event] = [].concat(cb)
        }

    }

    /**
     * 订阅一次
     * @param event
     * @param cb
     */
    once(event, cb) {
        const once = (...args) => {
            cb(...args)
            this.off(event, once)
        }
        this.on(event, once)
    }

    /**
     * 取消订阅
     * @param event
     * @param cb
     */
    off(event, cb) {
        this.listeners[event]=this.listeners[event].filter((n) => n !== cb)
    }

    /**
     * 发布
     * @param event
     * @param arg
     */
    emit(event, ...arg) {
        this.listeners[event].forEach((cb) => {
            cb.apply(null, arg)
        })
    }
}

export {EventEmitter}
