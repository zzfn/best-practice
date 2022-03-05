global.name = 'window'
var obj1 = {
    name: '1',
    fn1: function () {
        console.log(this.name)
    },
    fn2: () => console.log(this.name),
    fn3: function () {
        return function () {
            console.log(this.name)
        }
    },
    fn4: function () {
        return () => console.log(this.name)
    }
}
var obj2 = {
    name: '2'
}
obj1.fn1();             //1
obj1.fn1.call(obj2);    //2

obj1.fn2();             //window
obj1.fn2.call(obj2);    //window

obj1.fn3()();           //window
obj1.fn3().call(obj2);  //2
obj1.fn3.call(obj2)();  //window

obj1.fn4()();           //1
obj1.fn4().call(obj2);  //1
obj1.fn4.call(obj2)();  //2

