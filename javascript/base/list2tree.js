const genItems = (count = 1000, group = 4) => {
    const arr= []
    let i = 0
    while(count >= ++i) {
        arr.push({
            id: i,
            pid: (i - 1) / group >> 0,
            ts: Date.now(),
            hash: Math.random()
        })
    }
    return arr.sort(() => Math.random() - 0.5)
}

const arr =genItems(20)

function list2tree(list) {
    const option = {id: 'id', pid: 'pid', children: 'children'};
    return list.reduce((prev, curr) => {
        const obj = list.find((item) => item[option.id] === curr[option.pid]);
        if (obj) {
            !Object.prototype.hasOwnProperty.call(obj, option.children) && (obj[option.children] = []);
            obj[option.children].push(curr);
        } else {
            prev.push(curr);
        }
        console.log(curr,prev)
        return prev;
    }, []);
}

console.time('list2tree')
console.log(list2tree(arr))
console.timeEnd('list2tree')

