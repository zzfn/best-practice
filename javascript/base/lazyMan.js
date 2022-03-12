class _lazyMan {
    constructor(name) {
        const task = () => {
            console.log(`Hi! This is ${name}`);
            this.next();
        }
        this.taskList = [];
        this.taskList.push(task);
        setTimeout(()=>{
            this.next();
        },0);
    }

    next() {
        const task = this.taskList.shift(); // 取第一个任务执行
        task && task();
    }

    eat(food) {
        this.taskList.push(() => {
            console.log(`eating ${food}`);
            this.next();
        });
        return this
    }

    sleep(time) {
        this.taskList.push(() => {
            setTimeout(() => {
                console.log(`sleeping ${time}`);
                this.next();
            }, time * 1000);
        });
        return this
    }
}

function lazyMan(name) {
    return new _lazyMan(name);
}

lazyMan('lazy').eat('apple').sleep(2).eat('banana');
