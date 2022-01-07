
const list = [new Promise(resolve => {
    setTimeout(() => {
        resolve(2)
    }, 2000)
}), 3, Promise.resolve(4)]
Promise.myAll = function (arr) {
    return new Promise((resolve, reject) => {
        let result=[]
        let count=0
        for(let n in arr){
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
