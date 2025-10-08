// WeakRef
// 
// WeakRef creates a weak reference to the object passed to it. 
// This means that whenever the browser needs to run garbage collection if the only reference to that object is from a WeakRef variable, the JavaScript engine can safely remove the object from memory and free up space. 
// This could be ideal for WebSocket data because of their short lifespans.

const obj = { age: 44 };

const weakRef = new WeakRef(obj);

const refObj = weakRef.deref();

console.log(refObj?.age); // 44