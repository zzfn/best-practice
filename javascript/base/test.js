let a = {
    num: 0,
    valueOf: function () {
        return this.num += 1
    }
}
if (a === 1 && a === 2 && a === 3) {
    console.log('2')
} else {
    console.log(a)
}
