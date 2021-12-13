let crypto = require('crypto');
let d = require('fs').readFileSync('data.txt').toString().trim();

function matchStartString(str) {
    for(let i = 0; i != Number.MAX_VALUE; ++i) {
        hash = crypto.createHash('md5').update((d + i.toString())).digest('hex');
        if (hash.substring(0, str.length) === str) return i;
    }
}

// parts 1 and 2
console.log(matchStartString('00000'));
console.log(matchStartString('000000'));