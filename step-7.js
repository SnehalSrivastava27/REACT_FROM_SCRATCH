// Now we have passed the most difficult parts of React understanding DOM, React Fiber, how they used diffing algo earlier
// Now we will study about Functional Components
// Earlier react was using class components so why did we need functional

// Ans: 1. Easy Syntax 2. No maintainence of Constructors 3. Using Hooks made it super-effective

// function App(props) {
//   return <h1>Hi {props.name}</h1>
// }
// const element = <App name="foo" />
// const container = document.getElementById("root")
// Snehal.render(element, container)

function performUnitOfWork(fiber)
{
    // add new node
    const isFunctionComponent=fiber.type instanceof Function 
    if(isFunctionComponent)
    {
        updateFunctionComponent(fiber);
    }
    else{
          updateHostComponent(fiber);
    }
    if(fiber.parent)
    {
        fiber.parent.dom.appendChild(fiber.dom)
    }
        if(fiber.child)
    {
        return fiber.child
    }
    let nextFiber=fiber
    while(nextFiber)
    {
        if(nextFiber.sibling)
            return nextFiber.sibling;
        else
            nextFiber=nextFiber.parent;
    }
    function updateFunctionComponent(fiber) {
            const children = [fiber.type(fiber.props)]
            reconcileChildren(fiber, children)
    }

    function updateHostComponent(fiber) {
        if (!fiber.dom) {
            fiber.dom = createDom(fiber)
        }
        reconcileChildren(fiber, fiber.props.children)
    }   
    function reconcileChildren(wipFiber, elements)
    {
    let index=0
    let oldFiber=wipFiber.alternate && wipFiber.alternate.child;
    let prevSibling=null
    while(index<elements.length || oldFiber!=null)
    {
        const element = elements[index]
        const newFiber = null;
        const sameType=oldFiber&&element&&element.type==oldFiber.type; 
        if(sameType)
        {
            newFiber={
                type:oldFiber.type,
                props:element.props, 
                dom:oldFiber.dom, // we are using oldFiber dom because we know that element has not been render so it do not have dom it is vdom
                parent:wipFiber,
                alternate:oldFiber,
                effectTag:"UPDATE"
            }
            //update node
        }
        if(element &!sameType)
        {
             newFiber={
                type:element.type,
                props:element.props, 
                dom:null, // we have changed type so oldFiber does not play role here
                parent:wipFiber,
                alternate:null,
                effectTag:"PLACEMENT"
            }
            // add node
        }
        if(oldFiber & !sameType)
        {
               oldFiber.effectTag="DELETION"
               deletions.push(oldFiber);
            // remove node i.e old fiber & add new node i.e element
        }
        if(oldFiber)
        {
            oldFiber=oldFiber.sibling;
        }
        if(index==0)
        {
            fiber.child=newFiber 
        }
        else{
            prevSibling.sibling = newFiber
        }
        prevSibling=newFiber
        index ++;
    }



    }
}
function commitWork(fiber)
{
    if(!fiber)
        return
    const domParentFiber=fiber.parent;
    while(!domParentFiber.dom)
    {
        domParentFiber=domParentFiber.parent
    }
    const domParent = domParentFiber.dom
    if(fiber.effectTag="PLACEMENT"&&fiber.dom!=null)
    {
        domParent.appendChild(fiber.dom)
    }
    else if(fiber.effectTag="DELETION")
    {
         commitDeletion(fiber, domParent)
    }
    else if(fiber.effectTag="UPDATE"&&fiber.dom!=null){
         updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
    }
    domParent.appendChild(fiber.dom)
    commitWork(fiber.dom)
    commitWork(fiber.sibling)
}
function commitDeletion(fiber,domParent)
{
    if(fiber.dom)
    {
        domParent.removeChild(fiber.dom)
    }
    else
    {
        commitDeletion(fiber.child,domParent)
    }
}