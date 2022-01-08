function redYellowRed() {
    const colors = [{
        name: 'red',
        time: 3
    }, {
        name: 'yellow',
        time: 1
    }, {
        name: 'green',
        time: 2
    },];

    function next() {
        const color = colors.shift()
        console.log(color.name, new Date().toTimeString())
        colors.push(color)
        setTimeout(() => {
            next()
        }, color.time * 1000)
    }

    next()
}

redYellowRed()
