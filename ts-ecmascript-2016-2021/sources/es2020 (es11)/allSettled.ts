// Promise.allSettled
// 
// A common use case for this combinator is wanting to take an action after multiple requests have completed, regardless of their success or failure.

let isLoading = false;

async function runApp() {
    isLoading = true;    
    // Use Promise.all
    const urls = [ 1, 2, 3, 4 ];
    const requests = urls.map(x => Promise.resolve(x)); // Imagine some of these will fail, and some will succeed.
    // For trigger reject
    // requests.push(Promise.reject(5));
    console.log(`App started (isLoading : ${isLoading})`);
    // Short-circuits on first rejection, all other responses are lost
    try {
        await Promise.all(requests);
        console.log('All requests have completed; now I can remove the loading indicator.');
    } catch {
        console.log('At least one request has failed, but some of the requests still might not be finished! Oops.');
    }
    // Use Promise.allSettled
    // We know all API calls have finished. We use finally but allSettled will never reject.
    Promise.allSettled(requests).finally(() => {
        isLoading = false;
        console.log('All requests are completed: either failed or succeeded, I don’t care');
        console.log(`App terminated (isLoading : ${isLoading})`);
    });
}

runApp()
