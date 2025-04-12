function throttle(fn, delay) {
    let lastTime = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            fn.apply(this, args);
        }
    }
}

// 按固定频率执行（时间戳实现）
const throttledFn = throttle((value) => console.log(value), 1000);
throttledFn(1); // 立即输出1
setTimeout(() => throttledFn(2), 500); // 被忽略
setTimeout(() => throttledFn(3), 1100); // 输出3
