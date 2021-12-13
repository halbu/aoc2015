let d = require('fs').readFileSync('data.txt').toString().split("\n");

// part 1
function isNice(str) {
    if (['ab', 'cd', 'pq', 'xy'].some((s) => str.indexOf(s) >= 0)) return false;
    if ((str.match(/[aeiou]/g)||[]).length < 3) return false;
    for(let i = 1; i!= str.length; ++i) {
        if (str[i] === str[i-1]) return true;
    }
}

count = 0;
d.forEach(s => { if (isNice(s)) count++; })
console.log(count);

// part 2
function isNicePart2(str) {
    twoCharSubstrs = [];
    for(let i = 1; i!= str.length; ++i) {
        twoCharSubstrs.push(str[i-1] + str[i]);
    }
    if (!twoCharSubstrs.some(r => str.split(r).length > 2)) return false;
    for(let i = 2; i!= str.length; ++i) {
        if (str[i] === str[i-2]) return true;
    }
}

count = 0;
d.forEach(s => { if (isNicePart2(s)) count++; })
console.log(count);
