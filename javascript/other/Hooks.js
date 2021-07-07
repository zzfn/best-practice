let isMount = true
let workInProgressHook = null
const fiber = {
    stateNode: App,
    memoizedStated: null,
    queue:{
        pending:null
    }
}
function dispatchAction(queue,action){
const update={
    action,
    next:null
}
}
function useState(initialState) {
    let hook;
    if(isMount){
        hook={
            memoizedStated:initialState,
            next:null
        }
        if(!fiber.memoizedStated){
            fiber.memoizedStated=hook
        }else {
            workInProgressHook.next=hook
        }
        workInProgressHook=hook
    }else {
        hook=workInProgressHook
        workInProgressHook.next=workInProgressHook
    }
    return []
}
function schedule() {
    workInProgressHook = fiber.memoizedStated
    const app=fiber.stateNode()
    isMount = false
    return app
}

function App() {
    const [num, updateNum] = useState()

    return {
        onClick() {
            updateNum(num => num + 1)
        }
    }
}
window.app=schedule()
