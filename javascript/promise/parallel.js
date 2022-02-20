function parallel(promises, maxLimit) {
    let index = 0;
    let count = maxLimit
    let result = [];
    return new Promise((resolve, reject) => {
        function next() {
            count--
            const idx = index++
            const promise = promises[idx]
            promise().then(
                (res) => {
                    count++
                    result[idx] = res;
                    if (index < promises.length) {
                        next();
                    } else {
                        count === maxLimit && resolve(result);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        }

        for (let i = 0; i < maxLimit; i++) {
            next();
        }
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

console.time('parallel')
parallel(list, 2).then(result => {
    console.timeEnd('parallel')
    console.log(result)
}).catch(err => {
    console.log(err)
})
