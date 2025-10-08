// Symbol
// 
// Description property for Symbol objects
// 
// https://babeljs.io/docs/babel-plugin-transform-typeof-symbol

let sym = Symbol('foo');
console.log(sym.description);    // => foo

sym = Symbol();
console.log(sym.description);    // => undefined

// create a global symbol
sym = Symbol.for('bar');
console.log(sym.description);    // => bar