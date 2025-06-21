// We have seen that we say render makes recursive call & traverse the whole tree
// There’s a problem with this recursive call.

// Once we start rendering, we won’t stop until we have rendered the complete element tree. 
// If the element tree is big, it may block the main thread for too long.
// And if the browser needs to do high priority stuff like handling user input or keeping an animation smooth, 
// it will have to wait until the render finishes.

// So we are going to break the work into small units,
//  and after we finish each unit we’ll let the browser interrupt the rendering if there’s anything else that needs to be done.

let nextUnitofWork=null;
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
// We use requestIdleCallback to make a loop. You can think of requestIdleCallback as a setTimeout, 
// but instead of us telling it when to run, the browser will run the callback when the main thread is idle.

// React doesn’t use requestIdleCallback anymore. 
// Now it uses the scheduler package. But for this use case it’s conceptually the same.

function performUnitOfWork(nextUnitOfWork) {
  // TODO
}