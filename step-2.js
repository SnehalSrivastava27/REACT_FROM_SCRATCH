// now we create our render function

const Snehal={
    render
}
// abhi ke liye we will focus on adding the dom will see deleting & modifying later
// We start by creating the DOM node using the element type, 
// and then append the new node to the container.
function render(element,container)
{
    // const dom=document.createElement(element.type); // we need to handle the type of node therefore
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
    //render({ type: "h1" }, document.getElementById("root"))
    // container.appendChild(dom);
    // we do it recursively for each child
    element.props.children.forEach(child=>{
        render(child,dom)
    })
    container.appendChild(dom);
}
 // Final
//     <div id="root">
//   <h1></h1>
// </div>
/** @jsx Snehal.createElement */
//If we have a comment like this one, when babel transpiles the JSX it will use the function we define.
const element =(
    "div",
    <a>bar</a>,
    <b/>
)

const container = document.getElementById("root");
Snehal.render(element,container);
