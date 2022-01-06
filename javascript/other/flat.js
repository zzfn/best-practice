// Array.prototype.myFlat = function (level = 1) {
//     const array = this
//     if (level > 0) {
//         let result = [];
//         for (const item of array) {
//             if (Array.isArray(item)) {
//                 result = [...result, ...item.myFlat(level - 1)]
//             } else {
//                 result.push(item)
//             }
//         }
//         return result;
//     } else {
//         return array;
//     }
// }
Array.prototype.myFlat = function (level = 1) {
    return level > 0 ? this.reduce((acc, item) => {
        if (Array.isArray(item)) {
            return [...acc, ...item.myFlat(level - 1)]
        } else {
            return [...acc, item]
        }
    }, []) : this
}
console.log([1, 2, [3, [4, [5]]]].myFlat())
