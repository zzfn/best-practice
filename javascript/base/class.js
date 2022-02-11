"use strict"
this.name = 1
const a = {
    name: 2,
    say1: () => console.log(this.name),
    say2() {
        console.log(this)
    }
}
const b = a.say1;
const c = a.say2;
a.say1()
a.say2()
b();
c();

class Test {
    constructor() {
        this.name = 1
    }

    print() {
        console.log(this)
    }

    static print1() {
        console.log(this)
    }

    print2 = () => {
        console.log(this)
    }
    static print3 = () => {
        console.log(this)
    }
}

const a = new Test()
a.print()
a.print2()

class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayName = function () {
        console.log(this.name);
    };

    sayAge = () => {
        console.log(this.age);
    }
}

let tom = new Animal('tom', 19);
tom.sayAge()
tom.sayName()
let [sayName, sayAge] = [tom.sayName, tom.sayAge];
sayName.name = 3
sayAge();   // 正常输出19
sayName();  // this为undefined
let tom = {
    name: 'tom',
    age: 19,
    sayName: function () {
        console.log(this);
    },
    sayAge: () => {
        console.log(this);
    },
};
let [sayName, sayAge] = [tom.sayName, tom.sayAge];
sayAge();   // this指向外面的空对象{}，输出undefined
sayName();  // 抛出错误，this为undefined
window.foo = 22

function A() {
    this.foo = 1
}

A.prototype.bar = () => console.log(this)

let a = new A()
a.bar()
const b = a.bar
b()
const func = () => {
    // 这里 this 指向取决于外层 this，参考口诀 7 「不在函数里」
    console.log(this)
}


