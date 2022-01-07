
const list = [new Promise(resolve => {
    setTimeout(() => {
        resolve(2)
    }, 2000)
}), 3, Promise.resolve(4)]
Promise.myAll = function (arr) {
    return new Promise((resolve, reject) => {
        let result=[]
        let count=0
        for(let n in Object.keys(arr)){
            Promise.resolve(arr[n]).then(r=>{
                result[n]=r
                ++count
                if(count===arr.length){
                    resolve(result)
                }
            }).catch(e=>{
                reject(e)
            })
        }
    })
}
Promise.myAll(list).then(res => {
    console.log(res)
}).catch(e=>{
    console.log(e)
})
function requestUrls(urls = []) {
    let currentUrls = urls.slice(),result = [], pendingPromise = Promise.resolve();

    return new Promise((resolve) => {
        function next(){
            pendingPromise.then((data) => {
                if(data) result.push(data);
                const url = currentUrls.shift();
                if(!url) {
                    resolve(result)
                    return;
                };

                pendingPromise = request(url, Math.random() * 2000);
                next()

            })
        }

        next();

    })

}

function request(url, wait) {
    return new Promise(resolve => setTimeout(() => {
        console.log(url, wait);
        resolve(url);
    }, wait));
}
