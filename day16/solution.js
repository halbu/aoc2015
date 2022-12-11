let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());

M = { "children": 3, "cats": 7, "samoyeds": 2, "pomeranians": 3, "akitas": 0, "vizslas": 0, "goldfish": 5, "trees": 3, "cars": 2, "perfumes": 1 }

function findSue(useRanges) {
  for (let i = 0; i != d.length; ++i) {
    var name = d[i].split(": ")[0]
    var data = d[i].split(": ").slice(1).join(", ").split(", ") // honestly
    var found = true;
    for (let j = 0; j != data.length; j += 2) {
      var compound = data[j]
      var value = parseInt(data[j+1])
      if (useRanges && ["cats", "trees", "pomeranians", "goldfish"].includes(compound)) {
        if (["cats", "trees"].includes(compound)) {
          if (M[compound] >= value) {
            found = false
          } 
        } else if (["pomeranians", "goldfish"].includes(compound)) {
          if (M[compound] <= value) {
            found = false
          }
        }
      } else if (M[compound] !== value) {
        found = false
      }
    }
    if (found) return name;
  }
}

console.log("Day 16 part 1 solution: " + findSue(false));
console.log("Day 16 part 2 solution: " + findSue(true));