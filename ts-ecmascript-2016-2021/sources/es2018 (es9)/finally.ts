// Promise.prototype.finally
//
// https://babeljs.io/docs/usage#polyfill
// Promise.prototype.finally

let isLoading = true;

async function runApp() {
    isLoading = true;
    console.log(`App started (isLoading: ${isLoading})`);

    let isPromiseResolveState = false;
    let isPromiseRejectState = false;

    const calculateIsLoading = () => {
        isLoading =  isPromiseResolveState && isPromiseRejectState;
    }
    
    const myPromiseResolve = await Promise.resolve(42)
        .then((value) => {
            console.log(`Resolved value : ${value}`);
        })
        .catch((error) => {
            console.log(`Error : ${error}`);
        })
        .finally(() => {
            isPromiseResolveState = true;
            calculateIsLoading();
            console.log(`App finished (isLoading: ${isLoading})`)
        });

    const myPromiseReject = await Promise.reject(new Error('42'))
        .then((value) => {
            console.log(`Resolved value : ${value}`);
        })
        .catch((error) => {
            console.log(`Error : ${error}`);
        })
        .finally(() => {
            isPromiseRejectState = true;
            calculateIsLoading();
            console.log(`App finished (isLoading: ${isLoading})`)
        });
}

runApp();