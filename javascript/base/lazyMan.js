function _lazyMan(params) {
    this.queue = []
    this.run = function () {
        const task = this.queue.unshift()
    }
    this.sayHi = function (params) {
        console.log(`Hi!This is ${params}!`)
    }
    this.eat = function (params) {
        console.log(`Eat ${params}~`)
        return this
    }
    this.sleep = function (params) {
        setTimeout(function () {
            console.log(`Wake for ${params}s!`)
        }, params * 1000)
        return this
    }
    this.sleepFirst = function (params) {
        console.log(`Wake for ${params}s!`)
        return this
    }
}

function lazyMan(params) {
    return new _lazyMan(params)
}

// lazyMan('zz').eat('lunch').sleep('3').eat('dinner')
lazyMan('zz').eat('lunch').sleepFirst('3').eat('dinner')
