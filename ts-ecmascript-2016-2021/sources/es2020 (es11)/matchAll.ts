// String.prototype.matchAll
// 
// Returns an iterator object for all matches including capturing groups against a regular expression.

const re = /page (\d+)/g;
const str = 'page 2 and page 10';
// Case 1: use match
console.log(str.match(re));    
// => ["page 2", "page 10"]
// Case 2: use matchAll
console.log(...str.matchAll(re)); 
// => ["page 2", "2", index: 0, input: "page 2 and page 10", groups: undefined] 
// => ["page 10", "10", index: 11, input: "page 2 and page 10", groups: undefined]