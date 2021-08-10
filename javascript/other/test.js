function Test() {
    this.c = 3
}

Test.a = 1
Test.prototype.b = 2

class Person {
    static a = 1

    constructor() {
        this.c = 3
    }

    b() {
        return 2
    }

    d = 2
}
Person.e=3
const a=new Person()
console.log(a)