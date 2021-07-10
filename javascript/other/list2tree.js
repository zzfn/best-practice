

const arr = Array.from({length: 200}).map((node, idx) => ({id: idx, name: `tag-${idx}`, pid: parseInt(Math.random()*(500+1),10)}))
function list2tree(list) {
    const option = {id: 'id', pid: 'pid', children: 'children'};
    const a=list.reduce((prev, curr) => {
        const obj = list.find((item) => item[option.id] === curr[option.pid]);
        if (obj) {
            !Object.prototype.hasOwnProperty.call(obj, option.children) && (obj[option.children] = []);
            obj[option.children].push(curr);
        } else {
            prev.push(curr);
        }
        return prev;
    }, []);
    console.log(a)
}
list2tree(arr)
