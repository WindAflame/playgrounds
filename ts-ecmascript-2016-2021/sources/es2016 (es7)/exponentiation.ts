// Exponentiation operator
//
// https://babeljs.io/docs/babel-plugin-transform-exponentiation-operator

// x ** y
console.log(`squared: ${2 ** 2} == ${2 * 2}`);
console.log(`cubed: ${2 ** 3} == ${2 * 2 * 2}`);

// x **= y
let a = 2;
a **= 2; // same as: a = a * a;

let b = 3;
b **= 3; // same as: b = b * b * b;