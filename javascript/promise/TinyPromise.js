const pending = Symbol.for('pending')
const fulfilled = Symbol.for('fulfilled')
const rejected = Symbol.for('rejected')

class TinyPromise {
    constructor(executor) {
        this.state = pending
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }

    resolve(value) {
        if (this.state !== pending) return
        this.state = fulfilled
        this.value = value
        this.onFulfilledCallbacks.forEach(cb => cb(value))
    }

    reject(reason) {
        if (this.state !== pending) return
        this.state = rejected
        this.reason = reason
        this.onRejectedCallbacks.forEach(cb => cb(reason))
    }

    resolvePromise(newPromise, x, resolve, reject) {
        if (newPromise === x) {
            reject(new TypeError('The promise and the return value are the same'))
        }
        if (x instanceof TinyPromise) {
            x.then(value => {
                this.resolvePromise(newPromise, value, resolve, reject)
            })
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : value => {
            throw value
        };
        if (this.state === pending) {
            const promise = new Promise((resolve, reject) => {
                this.onFulfilledCallbacks.push(()=>{
                    try {
                        this.resolvePromise(promise, onFulfilled(this.value), resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                });
                this.onRejectedCallbacks.push(onRejected);
            })

        }
        if (this.state === fulfilled) {
            const promise = new Promise((resolve, reject) => {
                try {
                    this.resolvePromise(promise, onFulfilled(this.value), resolve, reject)
                } catch (e) {
                    reject(e);
                }
            })
        }
        if (this.state === rejected) {
            let promise = new Promise((resolve, reject) => {
                try {
                    this.resolvePromise(promise, onRejected(this.value), resolve, reject)
                } catch (e) {
                    reject(e);
                }
            })
            return promise
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    finally(onFinally) {
        return Promise.resolve(onFinally)
    }

    static resolve(value) {
        if (value instanceof TinyPromise) {
            return value
        } else {
            return new TinyPromise((resolve) => {
                resolve(value)
            })
        }
    }

    static reject(reason) {
        return new TinyPromise((resolve, reject) => {
            reject(reason)
        })
    }

    static deferred() {
        let result = {};
        result.promise = new TinyPromise(function (resolve, reject) {
            result.resolve = resolve;
            result.reject = reject;
        });

        return result;
    }
}

module.exports = TinyPromise;

