function quicklySort(brr) {
    if (!Array.isArray(brr)) {
        console.log('type error!');
        return;
    }
    if (brr.length <= 1) { //当数组brr的长度 <= 1 的时候，以为这brr这个数组只有一个数或者是个空数组，那么就直接返回，不需要往下进行
        return brr
    }
    var centerIndex = Math.floor(brr.length / 2); //获取中间数的下标
    var centerNum = brr.splice(centerIndex, 1)[0]; //通过中间数的下标来找中的数
    var left = [],
        right = []; //建立左右两个空的数组
    for (var i = 0; i < brr.length; i++) { //进行for循环
        if (brr[i] < centerNum) { //当下标所对应的数小于中间是数的时候，推入左边数组的最后边
            left.push(brr[i])
        } else { //不符合条件的推入右边数组的后边
            right.push(brr[i])
        }
    }
    return quicklySort(left).concat([centerNum], quicklySort(right)) //用concat将左边数组、中间数和右边数组连接起来
}

const arr = Array.from({length: 100}, (_) => Math.random() * 1000 >>> 1)
console.log(arr)
console.log(quicklySort(arr))