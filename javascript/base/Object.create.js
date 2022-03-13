function myCreate(p) {
    function C() {
    }

    C.prototype = p;
    const r=new C()
    if(p===null){
        r.__proto__=null
    }
    return r;
}
