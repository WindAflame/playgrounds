// Object.entries()
// Take an object as an argument and returns an array of the object’s own enumerable string-keyed property pairs in the form of [key, value].
//
// babel-plugin-transform-es2017-object-entries

const obj = {one: 1, two: 2, three: 3};

console.log(Object.entries(obj));    
// => [["one", 1], ["two", 2], ["three", 3]]