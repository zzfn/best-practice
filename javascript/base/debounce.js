function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
const debouncedFn = debounce((value) => console.log(value), 200);

// 连续触发5次，只输出最后一次
debouncedFn(1);
debouncedFn(2);
debouncedFn(3);
debouncedFn(4);
debouncedFn(5);
