// Object.values()
// Returns an array of given object’s own enumerable property values.
//
// # babel-plugin-transform-es2017-object-values

const object1 = {
    a: 'somestring',
    b: 42,
    c: false
  };
  console.log(Object.values(object1));
  // expected output: Array ["somestring", 42, false]