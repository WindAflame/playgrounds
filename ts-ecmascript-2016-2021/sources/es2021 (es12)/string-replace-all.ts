// String.replaceAll
// 
// This is a method that addresses a specific lack in String.prototype.replace. With the String.replaceAll you can easily replace all occurrences of a given string

const aName = "peter steve steve";
const newName = aName.replaceAll("steve", "tom");

console.log(newName); //output: peter tom tom