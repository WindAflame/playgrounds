// Class Static Block
// 
// 
// 
// https://babeljs.io/docs/babel-plugin-transform-class-static-block

class C {
    static #x = 42;
    static y;
    static {
        try {
            this.y = doSomethingWith(this.#x);
        } catch {
            this.y = "unknown";
        }
    }
}
  
# will be transformed to
  
class C {
    static #x = 42;
    static y;
    static #_ = (() => {
        try {
            this.y = doSomethingWith(this.#x);
        } catch {
            this.y = "unknown";
        }
    })();
}