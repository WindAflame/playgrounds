// String.prototype.padStart() and String.prototype.padEnd()
// Pad a string with another string until the resulting string reaches the supplied length. The string will repeat as necessary.
//
// string-padding

// padStart
console.log('cat'.padStart(5));         // '  cat'
console.log('cat'.padStart(5, 'a'));    // 'aacat'
console.log('cat'.padStart(1, 'a'));    // 'cat'
console.log('cat'.padStart(5, 'abc'));  // 'abcat'
console.log('cat'.padStart(8, 'abc'));  // 'abcabcat'
// padEnd
console.log('cat'.padEnd(5));         // 'cat  '
console.log('cat'.padEnd(5, 'a'));    // 'cataa'
console.log('cat'.padEnd(1, 'a'));    // 'cat'
console.log('cat'.padEnd(5, 'abc'));  // 'catab'
console.log('cat'.padEnd(8, 'abc'));  // 'catabcab'