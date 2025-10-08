// Object.fromEntries()
// 
// Transform a list of key-value pairs into an object.
// 
// babel-plugin-transform-es2017-object-entries

const myArray = [['one', 1], ['two', 2], ['three', 3]];
const myObj = Object.fromEntries(myArray);

console.log(myObj); // => {one: 1, two: 2, three: 3}