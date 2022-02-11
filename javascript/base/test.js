let name = 'global';
const obj = {
    name:'obj',
    test:function(){
        let name = 'scope';
        console.log(this.name);
    }
}
const test = obj.test;
test();//?
obj.test();//?
