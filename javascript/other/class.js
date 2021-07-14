"use strict"
// this.name=1
// const a={
//     name:2,
//     say1:()=>console.log(this.name),
//     say2(){
//         console.log(this)
//     }
// }
// const b=a.say1;
// const c=a.say2;
// a.say1()
// a.say2()
// b();
// c();

// class Test {
//     constructor() {
//         this.name=1
//     }
//     print() {
//         console.log(this)
//     }
//
//     static print1() {
//         console.log(this)
//     }
//
//     print2 = () => {
//         console.log(this)
//     }
//     static print3 = () => {
//         console.log(this)
//     }
// }
//
// const a = new Test()
// a.print()
// a.print2()
// class Animal {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//
//     sayName = function(){console.log(this.name);};
//
//     sayAge = ()=>{console.log(this.age);}
// }
//
// let tom = new Animal('tom',19);
// tom.sayAge()
// tom.sayName()
// let [sayName, sayAge] = [tom.sayName, tom.sayAge];
// sayName.name=3
// sayAge();   // 正常输出19
// sayName();  // this为undefined
// let tom =  {
//     name: 'tom',
//     age: 19,
//     sayName: function(){console.log(this);},
//     sayAge: ()=>{console.log(this);},
// };
// let [sayName, sayAge] = [tom.sayName, tom.sayAge];
// sayAge();   // this指向外面的空对象{}，输出undefined
// sayName();  // 抛出错误，this为undefined
// window.foo=22
// function A() {
//     this.foo = 1
// }
//
// A.prototype.bar = () => console.log(this)
//
// let a = new A()
// a.bar()
// const b=a.bar
// b()
// const func = () => {
//     // 这里 this 指向取决于外层 this，参考口诀 7 「不在函数里」
//     console.log(this)
// }
//
console.log(111)
//通过id找对象函数
function $(id){
    return document.getElementById(id)
};
// 获取元素样式函数
function getStyle(obj,attr){
    var css=obj.currentStyle || getComputedStyle(obj,null);
    return css[attr]
}
var video=$('video');
var duration=video.duration; //视频总时长;
// 进度条运动函数
var bar=$('bar');
var timer=null;
function run(){
    var currentTime=video.currentTime; //视频当前播放的时长;
    bar.style.width=currentTime/duration*100+'%';//进度条进度
}
// 点击改变进度条进度,控制视频播放进度;
var progress=$('progress');
progress.addEventListener('click',progress_click,false);
function progress_click(ev){
    var oEvent=ev ||event ;//兼容处理;
    var px=oEvent.clientX; //鼠标点击位置的横坐标位置;
    var pl=progress.offsetLeft;//div到浏览器左边的距离;
    var bwidth=px-pl; //鼠标点击位置进度条的长度;
    var pwidth=parseInt(getStyle(progress,'width'));
    bar.style.width=bwidth/pwidth*100+'%'; //进度条进度
    video.currentTime=duration*(bwidth/pwidth);//视频播放进度
}
// 播放
var play=$('play');
console.log(play)
play.addEventListener('click',play_click,false);
function play_click(){
    video.play();
    timer=setInterval(run,1000) //开启定时器
};

// 暂停
var pause=$('pause');
pause.addEventListener('click',pause_click,false);
function pause_click(){
    video.pause();
    clearInterval(timer) //清除定时器
};
// 音量加
var volume1=$('volume1');
volume1.addEventListener('click',volume1_click,false);
function volume1_click(){
    if(video.volume>=1){
        alert('音量已最大');
        return
    }
    video.volume+=0.2;
    video.volume=video.volume.toFixed(2);//解决小数运算精度问题
};

// 音量减
var volume2=$('volume2');
volume2.addEventListener('click',volume2_click,false);
function volume2_click(){
    if(video.volume<=0){
        alert('音量已为零');
        return
    }
    video.volume-=0.2;
    video.volume=video.volume.toFixed(2);//解决小数运算精度问题
}
// 快进
var currentTime1=$('currentTime1');
currentTime1.addEventListener('click',currentTime1_click,false);
function currentTime1_click(){
    video.currentTime+=10;
}

// 快退
var currentTime2=$('currentTime2');
currentTime2.addEventListener('click',currentTime2_click,false);
function currentTime2_click(){
    video.currentTime-=10;
}
// 加速
var playbackRate1=$('playbackRate1');
playbackRate1.addEventListener('click',playbackRate1_click,false);
function playbackRate1_click(){
    video.playbackRate+=0.5;
    video.playbackRate=video.playbackRate.toFixed(2);//解决小数运算精度问题
}

// 减速
var playbackRate2=$('playbackRate2');
playbackRate2.addEventListener('click',playbackRate2_click,false);
function playbackRate2_click(){
    video.playbackRate-=0.5;
    video.playbackRate=video.playbackRate.toFixed(2);//解决小数运算精度问题
}
// 播放屏幕大小
$('big').onclick=function(){
    $('wrap').style.width='900px';
}
$('cen').onclick=function(){
    $('wrap').style.width='600px';
}
$('lit').onclick=function(){
    $('wrap').style.width='300px';
}

