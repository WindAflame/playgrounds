// Promise.any and Promise.race
//   
//   The new promise.any takes an array of promises and resolves to the value of the first promise to successfully fulfill. 
//   So basically if any promise in the array fulfills, promise.any resolves, and it rejects if all promises in the array reject.
//   
//   There is a similarity between the promise.any and the promise.race, the only difference being that promise.race settles when any of the promises is settled — it doesn’t matter if it’s being rejected or fulfilled. 
//   So promise.any is applicable in cases whereby you try multiple requests and you need at least one fulfilling its promise.
//   
//   https://babeljs.io/docs/babel-plugin-transform-numeric-separator
 

function wait(ms: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (ms <= 2000) {
                resolve(`Resolved after ${ms} millisecondes`);
            } else {
                reject(`Timeout after ${ms} millisecondes`)
            }
        }, ms);
    });
}

const promise3 = wait(500);
const promise1 = wait(1000);
const promise2 = wait(2000);
const promise4 = wait(2001);

// Show : "Resolved after 500 millisecondes"
Promise.race([promise1, promise2, promise3])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

// Show : "Resolved after 500 millisecondes"
Promise.any([promise1, promise4, promise3])
    .then((result) => {
        console.log(result); 
    })
    .catch((error) => {
        console.error(error);
    });

// Show an error if all promises failed
Promise.any([promise4])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error); 
    });