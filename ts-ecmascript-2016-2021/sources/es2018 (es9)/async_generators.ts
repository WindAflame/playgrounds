// Asynchronous iteration
// 
// It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use plugin-proposal-async-generators to both parse and transform this syntax.
//
// https://babeljs.io/docs/babel-plugin-syntax-async-generators.html

// Async generator functions
async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}
  
async function runAsyncGenerator() {
    for await (const value of asyncGenerator()) {
        console.log(value);
    }
}

runAsyncGenerator();