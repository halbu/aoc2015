let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim())[0];

function testValidity(pw) {
  if ([105, 111, 108].some((s) => pw.includes(s))) return false;
  
  let foundRun = false;
  for (var i = 0; i != 6; ++i) {
    if (pw[i] + 1 === pw[i + 1] && pw[i] + 2 === pw[i + 2]) foundRun = true;
  }
  if (!foundRun) return false;

  let groups = []
  for (var i = 0; i < 8; ++i) {
    if (pw[i] === pw[i + 1]) groups.push(pw[i++])
  }
  return ([...new Set(groups)].length >= 2);
}

function increment(pw) {
  let ix = 8, incrementRequired = true
  while (incrementRequired) {
    pw[--ix] = pw[ix]+1
    if (pw[ix] !== 123) {
      incrementRequired = false
    } else pw[ix] = 97;
  }
  return pw;
}

// Convert to array of ints for easeier manipulation
d = [...Array(8)].map((_, i) => { return d.charCodeAt(i); })

while (!testValidity(d)) {
  d = increment(d);
}

console.log("Pt 1: " + d.map(x => String.fromCharCode(x)).join(''))

d = increment(d);
while (!testValidity(d)) {
  d = increment(d);
}

console.log("Pt 2: " + d.map(x => String.fromCharCode(x)).join(''))