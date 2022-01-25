// const sum = (x, y) => x + y;
//
// function sumCurry(a) {
//     return function (b) {
//         return a + b
//     }
// }
//
// console.log(sumCurry(1)(2))
//
// function curry(fn, ...arg) {
//     console.log(fn, arg)
//     return function (params) {
//         const p = arg.concat([params])
//         return fn(...p)
//     }
// }
//
// var addCurry = curry(function (a, b, c) {
//     return a + b + c;
// });

// console.log(addCurry(1)(2)(3));  // 6
// const curry = fn =>
//     judge = (...args) =>
//         args.length === fn.length
//             ? fn(...args)
//             : (arg) => judge(...args, arg)
const curry1 = (fn, ...args) =>
    args.length >= fn.length
        ? fn(...args)
        : (..._args) => curry1(fn, ...args, ..._args);


var fn = curry1(function (a, b, c) {
    return [a, b, c];
});
const currAdd = curry1(fn)
console.log(currAdd(1, 2, 3))
console.log(currAdd(1)(2)(3))
console.log(currAdd(1)(2, 3))
// const curry=(fn,...arg)=>arg.length>=fn.length?fn(...arg):(..._arg)=>curry(fn,...arg,..._arg)
const curry = (fn, ...args) => args.length < fn.length ? curry.bind(null, fn, ...args) : fn(...args);
