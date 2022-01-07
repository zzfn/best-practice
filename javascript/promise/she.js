const list = [
    () => request(1, 800),
    () => request(2, 500),
    () => request(3, 200),
    () => request(4, 800),
]

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

/**
 * 并发控制
 * @returns {Promise<unknown>}
 * @param urls
 * @param limit
 */
function requestUrlsReq(urls = [], limit = 2) {
    let result = []
    let index = 0
    let count = limit
    return new Promise((resolve, reject) => {
        function next() {
            if (urls.length === 0 && count === limit) {
                resolve(result)
            } else {
                while (count && urls.length) {
                    const idx = index++
                    const path = urls.shift()
                    count--
                    path().then(r => {
                        console.log(result)
                        count++
                        result[idx] = r
                        // result.push(r)
                        next()
                    })
                }
            }
        }

        next()
    })
}

function request(url, wait) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        }, wait)
    })
}

console.time('start')
requestUrlsReq(list, 3).then(r => {
    console.log(r)
    console.timeEnd('start')
})
// function test(urls) {
//     return urls.reduce((prevPromise, url) => prevPromise.then((r) => ), Promise.resolve())
// }
// test(list).then(r => {
//     console.log(r)
// })
