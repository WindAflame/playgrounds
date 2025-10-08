// RegExp named capture groups
// Numbered capture groups allow one to refer to certain portions of a string that a regular expression matches. Each capture group is assigned a unique number and can be referenced using that number.
// 
// https://babeljs.io/docs/babel-plugin-transform-named-capturing-groups-regex

let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
let result = re.exec('2015-01-02');
console.log(result);

console.log(result); // ...
if (result) {
    console.log(result[0] === '2015-01-02'); // '2015-01-02'
    console.log(result[1] === '2015'); // '2015'
    console.log(result[2] === '01'); // '01'
    console.log(result[3] === '02'); // '02'
    console.log(result.groups); // { year: '2015', month: '01', day: '02' }
    if (result.groups) {
        console.log(result.groups.year === '2015'); // 2015
        console.log(result.groups.month === '01'); // 01
        console.log(result.groups.day === '02'); // 02
    }
}

// The interface interacts nicely with destructing
let { groups: { one, two } } = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar') as RegExpExecArray;
console.log(`one: ${one}, two: ${two}`); // one: foo, two: bar

// Replacement targets '2015-01-02' -> '02/01/2015'
if (result) {
    let result2: string = result[0].replace(re, '$<day>/$<month>/$<year>');
    console.log(`${result[0]} -> '02/01/2015', result ${result2} : Success ? ${result2 === '02/01/2015'}`);
}