function Test() {
    this.c=3
}
Test.a=1
Test.prototype.b=2

console.log(new Test().b)
console.log(new Test().c)