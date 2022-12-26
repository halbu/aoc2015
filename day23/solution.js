let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());

console.log("Day 23 part 1 solution: " + processInstructions(0, 0));
console.log("Day 23 part 2 solution: " + processInstructions(1, 0));

function processInstructions(regAVal, regBVal) {
  reg = [regAVal, regBVal] // A, B
  let ix = 0, regPtr = 0

  while (ix >= 0 && ix < d.length) {
    tokens = d[ix].replace(",", "").replace("+", "").split(" ")
    regPtr = (tokens[1] === "a") ? 0 : 1
    jump = false

    if (tokens[0] === "hlf") {
      reg[regPtr] /= 2;
    } else if (tokens[0] === "tpl") {
      reg[regPtr] *= 3
    } else if (tokens[0] === "inc") {
      reg[regPtr]++
    } else if (tokens[0] === "jmp") {
      ix += parseInt(tokens[1])
      jump = true
    } else if (tokens[0] === "jie" && reg[regPtr] % 2 === 0) {
      ix += parseInt(tokens[2])
      jump = true
    } else if (tokens[0] === "jio" && reg[regPtr] === 1) {
      ix += parseInt(tokens[2])
      jump = true
    }
    if (!jump) ix++
  }

  return reg[1];
}