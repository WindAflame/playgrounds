// Array.prototype.flat()
// 
// Concatenate all sub-array elements of an array.

const arr = ['a', 'b', ['c', 'd']];
const flattened = arr.flat();

console.log(flattened);    // => ["a", "b", "c", "d"]