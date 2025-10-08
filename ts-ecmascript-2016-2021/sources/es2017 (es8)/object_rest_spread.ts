// Rest/Spread Properties
// 
// https://babeljs.io/docs/v7-migration#babelplugin-proposal-object-rest-spread

// Rest properties
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(`x= ${x}`); // 1
console.log(`y= ${y}`); // 2
console.log(`z= ${z}`); // { a: 3, b: 4 }
// Spread properties
let n = { x, y, ...z };
console.log(`n= ${n}`); // { x: 1, y: 2, a: 3, b: 4 }