function compose(...args) {
    return function (value) {
        return args.reduceRight((previousValue, currentValue) => {
            return currentValue(previousValue)
        },value)
    }
}
const reverse = (arr) => {
    console.log(1);return arr.reverse()};
const first = (arr) => arr[0];
const toUpper = (s) => {
    console.log(2);return s.toUpperCase()};
const f = compose(toUpper, first, reverse);
console.log(f(["one", "two", "three"])); // 'THREE'



const compose1 = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
