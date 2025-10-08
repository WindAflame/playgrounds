// Logical Assignment Operators
// 
// You might be familiar with logical operations like ??, &&, or || and the assignment operator =. 
// The Logical Assignment Operator introduced in ES2021 combines logical operations like ??, && or || with an assignment operator =.
// 
// https://babeljs.io/docs/babel-plugin-transform-logical-assignment-operators

// Using a Logical Assignment Operator
let a = true;
let b = false;
 
// Old
if (!a) {
 a = b;
}
// New
const result_or = a ||= b;
console.log(result_or); // returns a
 
// Old
if (a) {
 a = b;
}
// New
const result_and = a &&= b;
console.log(result_and); // returns b
 
// Nullish
let c1: number | null = null;
let c2 = 1;
let c3 = 2;
c1 ??= c2;
console.log(c1); // returns c2
c1 ??= c3;
console.log(c1); // returns c2