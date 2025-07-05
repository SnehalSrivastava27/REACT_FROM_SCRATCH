// ab hooks ki baari
let wipFiber = null
let hookIndex = null

function updateFunctionComponent(fiber) {
  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action(hook.state)
  })
  
// implementing use state
function useState(initial){
    const oldHook=wipFiber.alternate&&wipFiber.alternate.hooks&&wipFiber.alternate.hooks[hookIndex]
    const hook={state:oldHook?oldHook.state:initial, queue:[]}
    const setState=action=>{
        hook.queue.push(action)
        wipRoot={
            dom:currentRoot.dom,
            props:currentRoot.props,
            alternate:currentRoot
        }
        nextUnitOfWork=wipRoot
        deletions=[]
    }
    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state,setState]
}