let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim()).map(Number);

function getLowestPossibleQE(numberOfGroups) {
  let targetWeight = d.reduce((a, b) => a+b) / numberOfGroups
  let combos = findAllCombinations(d, 4, 8).filter(x => sum(x) == targetWeight);
  let loNumPkgs = combos.sort((a, b) => a.length < b.length ? -1 : 1)[0].length
  combos = combos.filter(x => x.length === loNumPkgs)
  
  let loQE = Number.MAX_SAFE_INTEGER;
  combos.forEach(c => { loQE = Math.min(loQE, c.reduce((a,b) => a*b)) })
  return loQE
}

[1, 2].forEach(n => console.log("Day 24 part " + n + " solution: " + getLowestPossibleQE(n + 2)));

function sum(arr) { return arr.reduce((a,b) => a+b); }

function findAllCombinations(arr, minArrLength, maxArrLength) {
  function fn(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all = [];
  for (var i = minArrLength; i < arr.length && i <= maxArrLength; i++) {
    fn(i, arr, [], all);
  }
  all.push(arr);
  return all;
}