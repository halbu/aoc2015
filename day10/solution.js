let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim())[0];

function seeAndSay(str) {
  let result = ''
  while (str.length > 0) {
    let ix = 0
    while (str[ix] == str[0] && ix < str.length) ix++
    let segment = str.slice(0, ix);
    str = str.slice(ix);
    result += segment.length + segment[0];
  }
  return result
}

[...Array(40)].forEach(() => d = seeAndSay(d));
console.log(d.length);

[...Array(10)].forEach(() => d = seeAndSay(d));
console.log(d.length);