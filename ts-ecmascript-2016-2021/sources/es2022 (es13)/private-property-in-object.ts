// Private property in object
// 
// 
// 
// https://babeljs.io/docs/babel-plugin-transform-private-property-in-object

class Foo {
    #bar = "bar";
}

let obj = new Foo();

console.log(obj.#bar); // Property '#bar' is not accessible outside class 'Foo'
