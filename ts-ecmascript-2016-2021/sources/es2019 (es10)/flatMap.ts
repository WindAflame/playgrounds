// Array.prototype.flatMap()
// 
// Combines map() and flat() into one method. If you want to remove an item from the result, simple return an empty array.

// With Array
const myArray = [[7.1], [8.1], [9.1], [10.1], [11.1]];

// do not include items bigger than 9
const flattenedArray = myArray.flatMap(value => {
  if (value >= 10) {
    return [];
  } else {
    return Math.round(value);
  }
});  

console.log(flattenedArray); // => [7, 8, 9]

// With Map
const myArrayMap = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 28 },
  ];
  
  const flattenedArrayMap = myArrayMap.flatMap(person => [
    { key: "id", value: person.id }
  ]);
  
  console.log(JSON.stringify(flattenedArrayMap)); // => [{"key":"id","value":1},{"key":"id","value":2},{"key":"id","value":3}]