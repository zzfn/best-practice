function toTree(arr) {
    let ret = {mid: arr.shift(), left: null, right: null};
    let q = [ret]
    while (q.length > 0) {
        let mid = q.shift()
        let left = {mid: arr.shift(), left: null, right: null}
        let right = {mid: arr.shift(), left: null, right: null}
        if (left.mid) {
            mid.left = left
            q.push(left)
        }
        if (right.mid) {
            mid.right = right
            q.push(right)
        }
    }
    return ret
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(JSON.stringify(toTree(arr)))
