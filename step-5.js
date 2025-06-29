// function performUnitOfWork(fiber)
// {
//     // add new node
//     if(!fiber.dom)
//     {
//         fiber.dom=createDom(fiber)
//     }
//     if(fiber.parent)                     --> Problem here 
//      We are adding a new node to the DOM each time we work on an element. 
//      And, remember, the browser could interrupt our work before we finish rendering the whole tree. 
//      In that case, the user will see an incomplete UI. And we don’t want that
//      So we need to remove the part that mutates the DOM from here.
//     {
//         fiber.parent.dom.appendChild(fiber.dom)
//     }
//     // todo add new fiber
//     const element=fiber.props.children
//     let index=0
//     let prevSibling=null
//     while(index<elements.length)
//     {
//         const element = elements[index]
//         const newFiber = {
//                 type: element.type,
//                 props: element.props,
//                 parent: fiber,
//                 dom: null,
//                 }
//         if(index==0)
//         {
//             fiber.child=newFiber 
//         }
//         else{
//             prevSibling.sibling = newFiber
//         }
//         prevSibling=newFiber
//         index ++;
//         //And we add it to the fiber tree setting it either as a child or as a sibling, depending on whether it’s the first child or not.
//     }
//     //Finally we search for the next unit of work. 
//     // We first try with the child, then with the sibling, then with the uncle, and so on.
//     if(fiber.child)
//     {
//         return fiber.child
//     }
//     let nextFiber=fiber
//     while(nextFiber)
//     {
//         if(nextFiber.sibling)
//             return nextFiber.sibling;
//         else
//             nextFiber=nextFiber.parent;
//     }

// }




//We will keep a track of the root of the fiber tree. We call it the work in progress root or wipRoot
function render(element,container)
{
        wipRoot={
        dom:container,
        props:{
            children:[element],
        },
        alternate:currentRoot,
    }
    nextUnitOfWork=wipRoot
}
let wipRoot=null;
let nextUnitOfWork=null;
let currentRoot=null;
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
    if(wipRoot&&!nextUnitOfWork){
        commitRoot()
    }
    requestIdleCallback(workLoop)
}
function commitRoot() {
  //Here we recursively append all the nodes to the dom.
  commitWork(wipRoot.child);
  currentRoot=wipRoot;
  wipRoot=null
}
function commitWork(fiber)
{
    if(!fiber)
        return
    const domParent=fiber.parent.dom;
    domParent.appendChild(fiber.dom)
    commitWork(fiber.dom)
    commitWork(fiber.sibling)
}
function performUnitOfWork(fiber)
{
    // add new node
    if(!fiber.dom)
    {
        fiber.dom=createDom(fiber)
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