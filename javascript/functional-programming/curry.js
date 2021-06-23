

const sum = (x, y) => x + y;
function sumCurry(a) {
    return function (b) {
        return a+b
    }
}

console.log(sumCurry(1)(2))
function curry(fn,...arg) {
    console.log(fn,arg)
    return function (params) {
        const p=arg.concat([params])
        return fn(...p)
    }
}
var addCurry=curry(function(a, b, c) {
    return a + b + c;
});

console.log(addCurry(1)(2)(3));  // 6
