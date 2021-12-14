let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim()), M = {};

let d2b = (dec) => parseInt(dec).toString(2).padStart(16, '0');
let updateMap = (t, g, l, r) => { // i could use actual bitwise operators but where's the fun in that. let's roll our own
    if (g === "SET")    M[t] = r;
    if (g === "AND")    M[t] = [...Array(16).keys()].map(i => l.charAt(i) === '1' && r.charAt(i) === '1' ? '1' : '0').join('');
    if (g === "OR")     M[t] = [...Array(16).keys()].map(i => l.charAt(i) === '1' || r.charAt(i) === '1' ? '1' : '0').join('');
    if (g === "NOT")    M[t] = [...Array(16).keys()].map(i => r.charAt(i) === '1' ? '0' : '1').join('');
    if (g === "RSHIFT") M[t] = l.substr(0, l.length - r).padStart(16, '0')
    if (g === "LSHIFT") M[t] = l.substr(r).padEnd(16, '0')
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
    } else right = input[0];

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