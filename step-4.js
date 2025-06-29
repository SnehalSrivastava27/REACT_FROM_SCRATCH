// replace old render function with createDom
function createDom(fiber)
{
    const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
    const isProperty=key=>key!=="children"
    Object.keys(element.props)
    .filter(isProperty)
    .forEach(name=>{
        dom[name]=element.props[name]
    })
    return dom
}

//In the render function we set nextUnitOfWork to the root of the fiber tree.
function render(element,container)
{
    nextUnitofWork={
        dom:container,
        props:{
            children:[element],
        },
    }
}
let nextUnitOfWork=null
//Then, when the browser is ready,it will call our workLoop and we’ll start working on the root.
function workLoop(deadline)
{
    let shouldYield=false;
    while(nextUnitofWork && !shouldYield)
    {
        nextUnitofWork=performUnitOfWork(
            nextUnitofWork
        )
        shouldYield=deadline.timeRemaining()<1
    }
    requestIdleCallback(workLoop)
}
function performUnitOfWork(fiber)
{
    // add new node
    if(!fiber.dom)
    {
        fiber.dom=createDom(fiber)
    }
    if(fiber.parent)
    {
        fiber.parent.dom.appendChild(fiber.dom)
    }
    // todo add new fiber
    const element=fiber.props.children
    let index=0
    let prevSibling=null
    while(index<elements.length)
    {
        const element = elements[index]
        const newFiber = {
                type: element.type,
                props: element.props,
                parent: fiber,
                dom: null,
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
        //And we add it to the fiber tree setting it either as a child or as a sibling, depending on whether it’s the first child or not.
    }
    //Finally we search for the next unit of work. 
    // We first try with the child, then with the sibling, then with the uncle, and so on.
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

}