function F() {

}

F.prototype = {a: 1}
const p1 = new F()
console.log(p1.a)
F.prototype = {a: 2}
console.log(p1.a)
const p2 = new F()
console.log(p2.a)