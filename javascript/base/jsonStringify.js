function jsonStringify(data) {
    if (typeof data === 'object') {
        let result = []
        if (Array.isArray(data)) {
            data.forEach(function (item) {
                result.push(jsonStringify(item))
            })
            return "[" + result + "]"
        } else {
            Object.keys(data).forEach(function (key) {
                result.push('"' + key + '"' + ":" + jsonStringify(data[key]))
            })
            return "{" + result + "}"
        }

    } else {
        return data;
    }
}

const source = {a: 1, b: {c: 2, d: {e: 3, f: 4}}, g: [5, 6, 7]}
console.log(jsonStringify(source));
console.log(JSON.stringify(source));
console.log(jsonStringify(source) === JSON.stringify(source));
