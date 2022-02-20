Array.prototype.myReduce = function (fn, initialValue) {
    let acc = initialValue;
    for (let i = 0; i < this.length; i++) {
        if (acc === undefined && i === 0) {
            acc = this[i];
        } else {
            acc = fn(acc, this[i], i, this);
        }
    }
    return acc;
}
const a = [1, 2, 3, 4, 5];
console.log(a.myReduce((acc, curr) => acc + curr, 0));
