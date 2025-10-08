// Optional chaining (?.)
// 
// Access inner properties without assigning intermediate results in temporary variables.
// 
// https://babeljs.io/docs/babel-plugin-proposal-optional-chaining-assign


// Object with minimal information
let user = {};

// Try to access to a not exists attribut
let street = user.address?.street;

// Expected undefined
console.log(street); // undefined
