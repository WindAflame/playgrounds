// Async/Await
// 
// https://babeljs.io/docs/babel-plugin-transform-async-to-generator

async function hello() {
    let greeting = await Promise.resolve("Hello");
    return greeting;
};

hello().then(console.log);