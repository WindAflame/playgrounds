// Private methods
// 
// 
// 
// https://babeljs.io/docs/babel-plugin-transform-private-methods

class Counter extends HTMLElement {
    #xValue = 0;

    get #x() {
        return this.#xValue;
    }
    set #x(value) {
        this.#xValue = value;
        window.requestAnimationFrame(this.#render.bind(this));
    }

    #clicked() {
        this.#x++;
    }
}