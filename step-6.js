// Till now we have only added the dom not we will update remove also
function commitRoot() {
  //Here we recursively append all the nodes to the dom.
  deletions.forEach(commitWork)
  commitWork(wipRoot.child);
  currentRoot=wipRoot;
  wipRoot=null
}
function render(element,container)
{
        wipRoot={
        dom:container,
        props:{
            children:[element],
        },
        alternate:currentRoot,
    }
    deletions=[]
    nextUnitOfWork=wipRoot
}
const isEvent = key => key.startsWith("on")
//One special kind of prop that we need to update are event listeners, 
// so if the prop name starts with the “on” prefix we’ll handle them differently.
const isProperty = key =>
  key !== "children" && !isEvent(key)
const isNew = (prev,next)=>key=>
    prev[key]!==next[key]
const isGone = (prev, next) => key => !(key in next)
// function updateDom(dom,prevProps,nextProps)
// {
//     
//     Object.keys(prevProps).filter(isProperty)
//     .filter(isGone(prevProps,nextProps)).forEach(name=>{
//         dom[name]=""
//     })
//     Object.keys(nextProps).filter(isProperty)
//     .filter(isNew(prevProps,nextProps))
//     .forEach(name=>{
//         dom[name]=nextProps[name]
//     })
// }
function updateDom(dom,prevProps,nextProps)
{
    // Remove old or change event listners
    Object.keys(prevProps).filter(isEvent)
    .filter(
        key=>(!key in nextProps) || isNew(prevProps,nextProps)(key) 
    ).forEach(name=>{
        const eventType=name.toLowerCase().substring(2)
           dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

    //remove old properties
      Object.keys(prevProps).filter(isProperty)
    .filter(isGone(prevProps,nextProps)).forEach(name=>{
        dom[name]=""
    })
    Object.keys(nextProps).filter(isProperty)
    .filter(isNew(prevProps,nextProps))
    .forEach(name=>{
        dom[name]=nextProps[name]
     })

     //add new event listeners
      Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}
function commitWork(fiber)
{
    if(!fiber)
        return
    const domParent=fiber.parent.dom;
    if(fiber.effectTag="PLACEMENT"&&fiber.dom!=null)
    {
        domParent.appendChild(fiber.dom)
    }
    else if(fiber.effectTag="DELETION")
    {
        domParent.removeChild(fiber.dom)
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

//That’s what we are going to do now, we need to compare the elements we receive on the 
// render function to the last fiber tree we committed to the DOM.
function commitRoot()
{
    commitWork(wipRoot.child);
    currentRoot=wipRoot;
    wipRoot=null
}
let currentRoot=null;
let deletions=null;
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
}