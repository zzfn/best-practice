const list = [() => request(1, 800), () => request(2, 500), () => request(3, 200),()=>request(1, 800),]

function requestUrls(urls = []) {
    return new Promise((resolve, reject) => {
        function next(paths, result = []) {
            if (paths.length === 0) {
                resolve(result)
            } else {
                const path = paths.shift()
                path().then(r => {
                    next(paths.slice(), result.concat(r))
                })
            }
        }
        next(urls, [])
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
requestUrls(list).then(r => {
    console.log(r)
    console.timeEnd('start')
})
// function test(urls) {
//     return urls.reduce((prevPromise, url) => prevPromise.then((r) => ), Promise.resolve())
// }
// test(list).then(r => {
//     console.log(r)
// })
