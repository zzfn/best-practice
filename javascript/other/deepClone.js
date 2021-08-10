function deepClone(target, map = new Map()) {
    if (typeof target === 'object') {
        if (target === null) {
            return null
        }
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.has(target)) {
            return target;
        }
        map.set(target, cloneTarget);
        const keys = Object.keys(target)
        for (const key of keys) {
            cloneTarget[key] = deepClone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target
    }
}
const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('code秘密花园');
    },
    func2: function (a, b) {
        return a + b;
    }
};

target.target = target;
console.time();
const result = deepClone(target);
console.log(result)
console.timeEnd();