// Standardized globalThis object
// 
// Access the global object across multiple platforms


// Check if globalThis is available
if (typeof globalThis !== 'undefined') {
  console.log("globalThis is available!");
  globalThis.myGlobalVariable = "Hello from the global scope!";
} else {
  console.log("globalThis is not available.");
}

// Access the global variable in another file
// In another JavaScript file
console.log(globalThis.myGlobalVariable); // Outputs "Hello from the global scope!"
// Access global array constructor
console.log(globalThis.Array(0, 1, 2)); // [0, 1, 2]
// Similar to window.v = { value: true } in <= ES10 in browser
globalThis.v = { value: true };
console.log(globalThis.v)