let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim()).map(x => x.split("x")); // you heard me
d = d.map(x => { return {l: parseInt(x[0]), w: parseInt(x[1]), h: parseInt(x[2])} });

// part 1
let paper = 0;
d.forEach(p => {
    paper += (2*p.l*p.w) + (2*p.w*p.h) + (2*p.h*p.l) + Math.min((p.l*p.w), (p.w*p.h), (p.h*p.l));
});
console.log(paper);

// part 2
let ribbon = 0;
d.forEach(p => {
    sides = [p.l, p.w, p.h].sort((a, b) => a - b);
    ribbon += (sides[0]*2 + sides[1]*2 + (sides[0] * sides[1] * sides[2]));
})
console.log(ribbon);