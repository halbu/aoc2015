let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());

setChar = (str, i, char) => str.substr(0, i) + char + str.substr(i + 1);
valid = (x, y) =>  x >= 0 && x < d.length && y >= 0 && y < d[0].length;

function next(x, y, cornersLit) {
  if (cornersLit && [0, 99, 198].includes(x + y) && [0, (99**2)].includes(x * y)) return '#'

  var n = 0;
  for (var i = x - 1; i <= x + 1; ++i) {
    for (var j = y - 1; j <= y + 1; ++j) {
      n += (valid(i, j) && !(i === x && j === y) && d[i][j] === "#") ? 1 : 0
    }
  }

  return d[x][y] === '#' ? (n === 2 || n === 3 ? '#' : '.') : n === 3 ? '#' : '.'
}

for (let cycles = 0; cycles != 100; ++cycles) {
  d = [...Array(100).keys()].map(i => [...Array(100).keys()].map(j => { return next(i, j, 0) } ).join(""));
}
console.log("Day 18 part 1 solution: " + d.map((l) => { return l.split("#").length - 1 }).reduce((a, b) => a + b))

d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());         // Reset the grid
[0, d.length - 1].forEach(x => [0, d.length - 1].forEach(y => d[x] = setChar(d[x], y, '#')))  // Pre-light corners

for (let cycles = 0; cycles != 100; ++cycles) {
  d = [...Array(100).keys()].map(i => [...Array(100).keys()].map(j => { return next(i, j, 1) } ).join(""));
}
console.log("Day 18 part 2 solution: " + d.map((l) => { return l.split("#").length - 1 }).reduce((a, b) => a + b))