function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(
                        function (value) {
                            step("next", value);
                        },
                        function (err) {
                            step("throw", err);
                        }
                    );
                }
            }

            return step("next");
        });
    };
}

let num = 1;

function b() {
    return new Promise(resolve => {
        setTimeout(() => resolve(num++), 1000);
    });
}

function* a() {
    let value1 = yield b();
    let value2 = yield b();
    let value3 = yield b();
    console.log('---',value1, value2, value3);
    return value3
}
//
// _asyncToGenerator(a)().then(res => {
//     console.log(res);
// });
Co(a).then(res => {
    console.log(res);
});
function Co(fn) {
    return new Promise(resolve =>{
        var gen = fn();
        function next(err, data) {
            var result = gen.next(data);
            if (result.done) {
                resolve(result.value);
            } else {
                result.value.then(function (data) {
                    next(null, data);
                }, function (err) {
                    next(err);
                });
            }
        }
        next();
    })
}
