function deepClone(target,map = new Map()) {
    if(typeof target==='object'){
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.has(target)) {
            return target;
        }
        map.set(target, cloneTarget);
        const keys = Object.keys(target)
        for (const key of keys) {
            cloneTarget[key] = deepClone(target[key],map);
        }
        return cloneTarget;
    }else {
        return target
    }
};
