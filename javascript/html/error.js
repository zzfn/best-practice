const monitor = { // 前端监控
    performance: null, // 性能
    resources: [], // 资源
    errors: [] // 错误
}

// 获取页面加载的时间性能信息
function getPerformance() {
    if (!window.performance) return
    const timing = window.performance.timing
    return {
        whiteScreen: timing.domLoading - timing.navigationStart, // 白屏时间
        redirect: timing.redirectEnd - timing.redirectStart, // 重定向耗时
        dom: timing.domComplete - timing.domLoading, // dom渲染耗时
        load: timing.loadEventEnd - timing.navigationStart, // 页面加载耗时
        unload: timing.unloadEventEnd - timing.unloadEventStart, // 页面卸载耗时
        request: timing.responseEnd - timing.requestStart, // 请求耗时
        time: new Date().getTime(), // 获取性能信息时当前时间
    }
}
// 获取页面资源加载的时间性能信息
function getResources() {
    if (!window.performance) return
    const data = window.performance.getEntriesByType('resource')
    const resources = {
        css: [],
        img: [],
        script: [],
        xmlhttprequest: [],
        link: [],
        fetch: [],
        iframe: [],
        other: [],
        time: new Date().getTime()  // 获取资源信息时当前时间
    }
    data.forEach(item => {
        let key = resources[item.initiatorType]?item.initiatorType:'other'
        resources[key].push({
            name: item.name, // 资源的名称
            duration: item.duration.toFixed(2), // 资源加载耗时
            size: item.transferSize, // 资源大小
            protocol: item.nextHopProtocol, // 资源所用协议
        })
    })
    return resources
}
// 采集页面错误
function collectError() {
    // 资源加载错误数据采集
    addEventListener('error', e => {
        const target = e.target
        if(target != window) {
            monitor.errors.push({
                type: target.localName,
                url: target.src || target.href,
                msg: (target.src || target.href) + ' is load error',
                time: new Date().getTime(), // 错误发生的时间
            })
        }
    }, true)
    // 监听js错误
    window.onerror = function(msg, url, row, col, error) {
        monitor.errors.push({
            type: 'javascript',
            row: row,
            col: col,
            msg: error && error.stack? error.stack : msg,
            url: url,
            time: new Date().getTime(), // 错误发生的时间
        })
    }
    // 监听 promise 错误 缺点是获取不到行数数据
    addEventListener('unhandledrejection', e => {
        monitor.errors.push({
            type: 'promise',
            msg: (e.reason && e.reason.msg) || e.reason || '',
            time: new Date().getTime(), // 错误发生的时间
        })
    })
}

function uploadMonitor() { // 上报前端监控的性能数据+资源数据
    axios.post('/xxxx', { performance: monitor.performance, resources: monitor.resources } )
}
function uploadMonitorErrors() { // 上报前端监控的错误数据
    navigator.sendBeacon('/xxxx', monitor.errors)
}

window.onload = function() { // 在页面加载完后上报性能数据
    if(window.requestIdleCallback) { // 如果浏览器支持这个方法，利用这个方法采集页面性能数据
        window.requestIdleCallback(() => {
            monitor.performance = getPerformance()
            monitor.resources = getResources()
            uploadMonitor()
        })
    } else {
        setTimeout(function() {
            monitor.performance = getPerformance()
            monitor.resources = getResources()
            uploadMonitor()
        }, 0)
    }
}
window.unload = function() { // 在页面卸载的时候上报错误数据
    uploadMonitorErrors()
}

collectError()
