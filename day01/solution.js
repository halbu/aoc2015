let d = require('fs').readFileSync('data.txt').toString().split("");

// part 1
let floor = 0;
d.forEach(f => {floor += (f === '(') ? 1 : -1})
console.log(floor);

// part 2
floor = 0;
for(var i = 0; i != Number.MAX_VALUE; ++i) {
    floor += (d[i] === '(') ? 1 : -1;
    if (floor < 0) {
        console.log(i + 1);
        break;
    }
}