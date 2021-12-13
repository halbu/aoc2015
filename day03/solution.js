let d = require('fs').readFileSync('data.txt').toString().split('');
let M = {'0:0': true};

// part 1
let loc = [0, 0]
d.forEach(i => {
    loc[0] += (i === '<') ? -1 : (i === '>') ? 1 : 0;
    loc[1] += (i === '^') ? -1 : (i === 'v') ? 1 : 0;
    M[(loc[0] + ":" + loc[1])] = true;
})
console.log(Object.keys(M).length);

// part 2
loc = [0, 0]
let rloc = [0, 0]
M = {'0:0': true};
for(let i = 0; i!= d.length; ++i) {
    let tloc = (i % 2 == 0) ? loc : rloc;
    tloc[0] += (d[i] === '<') ? -1 : (d[i] === '>') ? 1 : 0;
    tloc[1] += (d[i] === '^') ? -1 : (d[i] === 'v') ? 1 : 0;
    M[(tloc[0] + ":" + tloc[1])] = true;
};
console.log(Object.keys(M).length);