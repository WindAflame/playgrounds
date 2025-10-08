// BigInt
// 
// A new primitive that provides a way to represent whole numbers larger than 2⁵³, which is the largest number Javascript can reliably represent with the Number primitive.
// 
// https://babeljs.io/docs/babel-plugin-syntax-dynamic-import

// A BigInt is created by appending n to the end of the integer or by calling the constructor.
const theBiggestInt = 9007199254740991n;
console.log(theBiggestInt);

const alsoHuge = BigInt(9007199254740991);
console.log(alsoHuge);
// ↪ 9007199254740991n

const hugeButString = BigInt('9007199254740991');
console.log(hugeButString);
// ↪ 9007199254740991n