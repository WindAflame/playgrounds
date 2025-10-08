// Dynamic import
// 
// “Function-like” import() module loading syntactic form to JavaScript.
// 
// https://babeljs.io/docs/babel-plugin-syntax-dynamic-import

async function main() {
    try {
        const module = await import('./module'); // Import dynamique du module
        module.myFunction();
    } catch (error) {
        console.error("Erreur lors du chargement du module :", error);
    }
}

main();