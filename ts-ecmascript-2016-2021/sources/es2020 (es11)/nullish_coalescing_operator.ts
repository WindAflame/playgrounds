// Nullish coalescing operator
// 
// https://babeljs.io/docs/babel-plugin-syntax-nullish-coalescing-operator

const response = {
    settings: {
        nullValue: null,
        height: 400,
        animationDuration: 0,
        headerText: '',
        showSplashScreen: false
    }
};

const undefinedValue = response.settings.undefinedValue ?? 'some other default';
console.log(undefinedValue); // result: 'some other default'
const undefinedValue2 = response.settings.undefinedValue?.anotherUndefinedValue ?? 'some other default';
console.log(undefinedValue2); // result: 'some other default'
const nullValue = response.settings.nullValue ?? 'some other default'; 
console.log(nullValue); // result: 'some other default'
const headerText = response.settings.headerText ?? 'Hello, world!'; 
console.log(headerText); // result: ''
const animationDuration = response.settings.animationDuration ?? 300; 
console.log(animationDuration); // result: 0
const showSplashScreen = response.settings.showSplashScreen ?? true; 
console.log(showSplashScreen); // result: false