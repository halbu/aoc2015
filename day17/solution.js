let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => parseInt(x.trim())).sort((a,b) => a - b);
let combinations = []

function tryFillRecursive(litres, empty, filled) {
  for (let i = 0; i < empty.length; ++i) {
    if (150 - litres === empty[i]) {
      combinations.push([empty[i], ...filled])
    } else if (litres + empty[i] < 150) {
      tryFillRecursive(litres + empty[i], empty.slice(i + 1), [empty[i], ...filled])
    }
  }
}

tryFillRecursive(0, d, [])
console.log("Day 17 part 1 solution: " + combinations.length)
var shortest = combinations.sort((a, b) => a.length - b.length)[0].length;
console.log("Day 17 part 2 solution: " + combinations.filter(x => x.length === shortest).length)