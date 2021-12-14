let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());
M = {};

// i could use actual bitwise operators for this but where's the fun in that. let's roll our own
let d2b = (dec) => parseInt(dec).toString(2).padStart(16, '0');
let bAnd = (a, b) => Array.from(Array(16).keys()).map(i => a.charAt(i) === '1' && b.charAt(i) === '1' ? '1' : '0').join('')
let bOr = (a, b) => Array.from(Array(16).keys()).map(i => a.charAt(i) === '1' || b.charAt(i) === '1' ? '1' : '0').join('')
let bNot = (s) => Array.from(s).map(x => x === '1' ? '0' : '1').join('');
let bShiftL = (s, ox) => s.substr(ox).padEnd(16, '0')
let bShiftR = (s, ox) => s.substr(0, s.length - ox).padStart(16, '0')

function updateMap(target, gate, left, right) {
    if (gate === "SET")      M[target] = left;
    if (gate === "AND")      M[target] = bAnd(left, right);
    if (gate === "OR")       M[target] = bOr(left, right)
    if (gate === "NOT")      M[target] = bNot(right)
    if (gate === "RSHIFT")   M[target] = bShiftR(left, right)
    if (gate === "LSHIFT")   M[target] = bShiftL(left, right)
}

while (d.length > 0) { // continually search the data for connections for which all inputs are valid
    let c = d.shift();
    let cx = c.split(' -> ');
    let input = cx[0].split(' '), target = cx[1];
    let left, right, gate = "SET";
    if (input.length === 3) {
        gate = input[1];
        left = input[0];
        right = input[2];
    } else if (input.length === 2) {
        gate = input[0];
        right = input[1];
    } else left = input[0];

    if ((left && isNaN(left) && !M[left]) || (right && isNaN(right) && !M[right])) {
        d.push(c);  // if any input to the gate is a wire that has no signal,
        continue;   // move this instruction to the back of the queue for now
    }

    if (left) left = (!isNaN(left)) ? d2b(left) : M[left];
    if (right) right = (!isNaN(right)) ? d2b(right) : M[right];
    if (gate === "LSHIFT" || gate === "RSHIFT") right = parseInt(right, 2)
    updateMap(target, gate, left, right);
}

console.log('Part 1: ' + parseInt(M['a'], 2));