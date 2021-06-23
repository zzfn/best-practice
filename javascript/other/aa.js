const a=new Promise(resolve => {
    setTimeout(() => {
        resolve(2)
    }, 2000)
})
a.then(r=>{
    console.log(r)
})