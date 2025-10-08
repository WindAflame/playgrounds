// Trailing comma
// 
// https://babeljs.io/docs/v8-migration#syntax-plugins
// @babel/plugin-syntax-trailing-function-commas

// Array
let arr = [ 1, 2, ];

// Objects
let obj = { 
    a: 95, 
    b: 23,
  };

// Parameter Definitions
function f(a,b,) {}

// Function Calls
f(1,2,);

// NOT SUPPORTED USAGE
// > function f(...a,) {};

// SyntaxError: parameter after rest parameter
// > let [a, ...b,] = [1, 2, 3, 4, 5];

// SyntaxError: rest element may not have a trailing comma
// > JSON.parse('["a", "b",]');
// SyntaxError JSON.parse: unexpected character