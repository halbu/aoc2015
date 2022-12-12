let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());
var M = {}, molecule = "", possibilities = []

d.forEach(line => {
  if (line.split(" => ").length > 1) {
    var from = line.split(" => ")[0], to = line.split(" => ")[1]
    if (!M[from]) {
      M[from] = [to]
    } else M[from].push(to)
  } else if (line !== "") molecule = line
})

function findReplacementPossibilitiesAtIndex(mol, ix) {
  for (let i = 0; i <=2; ++i) {
    var segment = mol.slice(ix, ix + i)
    if (M[segment]) {
      M[segment].forEach(newSeg => {
        possibilities.push(mol.slice(0, ix) + newSeg + mol.slice(ix + i))
      })
    }
  }
}

for (var i = 0; i != molecule.length; ++i) {
  findReplacementPossibilitiesAtIndex(molecule, i)
}

console.log("Day 19 part 1 solution: " + [...new Set(possibilities)].length)

function recursiveReduce(mol, steps) {
  if (mol === "e") {
    console.log("Day 19 part 2 solution: " + steps)
    return
  }

  var replacements = []

  for(var i = 0; i != mol.length - 1; ++i) {
    for(var j = 0; i + j <= mol.length && j <= 10; ++j) {
      var seg = mol.slice(i, i+j)
      Object.entries(M).forEach(e => {
        if (e[1].includes(seg)) {
          replacements.push({ in: seg, out: e[0], len: seg.length })
        }
      })
    }
  }

  replacements = replacements.sort((a, b) => a.len - b.len);  // We just reduce by the biggest replaceable chunk
  var repl = replacements.pop()                               // each time. I thought this was going to require
  recursiveReduce(mol.replace(repl.in, repl.out), steps + 1)  // branching recursion, but the naive method works.
}

recursiveReduce(molecule, 0)