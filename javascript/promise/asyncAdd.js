function asyncAdd(a, b) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(a + b);
        }, 1000);
    });
}
并行
function add(...args) {
    let active = 0;
    return new Promise((resolve) => {
        function run() {
            if (args.length === 1 && active === 0) {
                resolve(args[0]);
            }
            let promiseArr=[];
            let len=args.length;
            while (args.length>=2) {
                promiseArr.push(asyncAdd(args.shift(), args.shift()));
            }
        }
        run();
    });
}

console.time('add');
add(1, 2, 3, 4, 5).then(function (result) {
    console.timeEnd('add');
    console.log(result);
});
