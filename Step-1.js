// Please keep the reference of Step0 code 
// Now we will create our own CreateElement
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )

// const element =React.createElement(
//     "div",
//     React.createElement("a",null,"bar"), 
        // here instead of null you can write id,title,class name
//     React.createElement ("b")
// )


// Now we will replace this code by our

function createElement(type,props,...children)
{
    return{
        type,
        props:{
        ...props,
        children:children.map(child=>
            typeof child==="object"
            ?child
            :createTextElement(child)
        ),
    },
}
}
function createTextElement(text){
    return{
        type:"TEXT_ELEMENT",
        props:{
            nodeValue:text,
            children:[],
        }
    }
}

//The children array could also contain primitive values like strings or numbers. 
// So we’ll wrap everything that isn’t an object inside its own element and create a special type for them: TEXT_ELEMENT

//React doesn’t wrap primitive values or create empty arrays when there aren’t children,
//  but we do it because it will simplify our code, and for our library we prefer simple code than performant code.

// Now i will create my own Library known as Snehal

const Snehal={
    createElement,
}

// now you can use it as
// const element =Snehal.createElement(
//     "div",
//     Snehal.createElement("a",null,"bar"), 
//     Snehal.createElement ("b")
// )

// or simply
/** @jsx Snehal.createElement */
//If we have a comment like this one, when babel transpiles the JSX it will use the function we define.
const element =(
    "div",
    <a>bar</a>,
    <b/>
)


// const container = document.getElementById("root")
// ReactDOM.render(element, container)





