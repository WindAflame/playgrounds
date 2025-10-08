// String.prototype.trimStart() and String.prototype.trimEnd()
// 
// Technically the same as trimLeft() & trimRight()

const str = "   string   ";

// es2019
console.log(str.trimStart());    // => "string   "
console.log(str.trimEnd());      // => "   string"

// the same as (Deprecated)
console.log(str.trimLeft());     // => "string   "
console.log(str.trimRight());    // => "   string"