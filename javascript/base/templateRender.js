function render(template, data) {
    return template.replace(/\{\{(.*?)\}\}/g, function (match, key) {
        return data[key];
    });
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: '布兰',
    age: 12,
    sex: '女'
}
console.log(render(template, person)); // 我是布兰，年龄12，性别undefined

