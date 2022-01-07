/**
 * js继承
 */

function Parent() {
    this.names = ['kevin', 'daisy'];
}

/**
 * 原型链继承
 */

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child1() {

}

Child.prototype = new Parent();

const child1 = new Child1();
const child2 = new Child1();

child1.name.a = 2
child2.getName()

/**
 * 借用构造函数继承
 */

function Child2() {
    Parent.call(this);
}

const child3 = new Child2();
const child4 = new Child2();

child3.names.push('yayu');

console.log(child3.names); // ["kevin", "daisy", "yayu"]
console.log(child4.names); // ["kevin", "daisy"]

/**
 * 组合式继承
 */

function Child3() {
    Parent.call(this)
}

Child3.prototype = new Parent();
Child3.prototype.constructor = Child3
/**
 * 原型式继承
 */
function createObj1(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
//等价与Object.create
/**
 * 寄生式继承
 */
function createObj2 (o) {
    const clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}

/**
 * 寄生组合式继承
 */
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    const prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
