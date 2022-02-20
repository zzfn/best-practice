/**
 * promise串行执行
 * @param promises
 * @returns {*}
 */
function serial(promises) {
    let result = []
    return promises.reduce((promise, next, index) => {
        return promise.then(res => {
            return next().then(r => {
                result.push(r)
                return index === promises.length - 1 ? result : serial
            })
        })
    }, Promise.resolve())
}

const list = [
    () => request(1, 800),
    () => request(2, 500),
    () => request(3, 200),
    () => request(4, 800),
]

function request(url, wait) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        }, wait)
    })
}
console.time('serial')
serial(list).then(r=>{
    console.timeEnd('serial')
    console.log(r)
})

/**
 * 串行
 * @param urls
 * @returns {Promise<unknown>}
 */
function requestUrls(urls = []) {
    let result = []
    return new Promise((resolve, reject) => {
        function next(paths) {
            if (paths.length === 0) {
                resolve(result)
            } else {
                const path = paths.shift()
                path().then(r => {
                    result.push(r)
                    next(paths.slice())
                })
            }
        }

        next(urls)
    })
}
