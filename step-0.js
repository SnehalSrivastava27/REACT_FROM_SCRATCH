// const element =<h1 title='hello'>hello</h1>


// This is jsx we need to convert this into valid JS first
// JSX is transformed to JS by build tools like Babel. 
// The transformation is usually simple: replace the code inside the tags with 
// a call to createElement, passing the tag name, the props and the children as parameters.

// Question arises 
// What is Babel & how it all is done

// React.createElement creates an object from its arguments. 
// Besides some validations, that’s all it does. So we can safely replace the function call with its output.

// const element=React.createElement(
//     "h1",  // yeh type hogya 
//     {title:"hello"},
//     "Hello"
// )

// this is what an element is an object with two properties type & prop
// type is basically the tagname you pass in react.createElement
//props alag cheej hit has all keys & values also a special property called children

const element={
    type:"h1",
    props:{
        title:"hello",
        children:"Hello"
    }
}

const container = document.getElementById("root");


// ReactDOM.render(element,container)

// ab now we need to replace this ReactDOM.render
// render is where React changes the DOM, so let’s do the updates ourselves.

// First we create a node* using the element type, in this case h1.
// Then we assign all the element props to that node. Here it’s just the title.
// * To avoid confusion, I’ll use “element” to refer to React elements and “node” for DOM elements.

const node=document.createElement(element.type);
node["title"]=element.props.title;

// Then we create the nodes for the children. We only have a string as a child so we create a text node.
// Using textNode instead of setting innerText will allow us to treat all elements in the same way later.
// Note also how we set the nodeValue like we did it with the h1 title, it’s almost as if the string had props: {nodeValue: "hello"}.

const text=document.createTextNode("")
text["nodeValue"]=element.props.children
node.appendChild(text);
container.appendChild(node)



// Now we have the same app as of earlier
//const element = <h1 title="foo">Hello</h1>
// const container = document.getElementById("root")
// ReactDOM.render(element, container)


// Modern React
// import React from 'react';
// import { createRoot } from 'react-dom/client';

// function App() {
//   return <h1 title="foo">Hello</h1>;
// }

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);


