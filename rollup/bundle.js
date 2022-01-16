function say1(name) {
  console.log(`${name}1`);
}

function test() {
  Object.entries({
    a: 1,
    b: 2
  });
  say1('aaa');
}

export { test as default };
