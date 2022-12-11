let d = JSON.parse(require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim())[0]);
var count = 0;
//called with every property and its value
function process(_, v) {
  if (Number.isInteger(v)) {
    count += parseInt(v)
  }
}

function traverse(o, func) {
  for (var i in o) {
    func.apply(this, [i,o[i]]);  
    if (o[i] !== null && typeof(o[i]) == "object") {
      traverse(o[i], func);
    }
  }
}

traverse(d, process);
console.log("Day 12 part 1 solution: " + count);