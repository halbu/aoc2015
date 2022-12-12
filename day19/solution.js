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

function repl(mol, ix) {
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
  repl(molecule, i)
}

console.log("Day 19 part 1 solution: " + [...new Set(possibilities)].length)