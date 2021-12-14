let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());
let mx = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

function sw1(i, x, y) { mx[x][y] = i === 'toggle' ? (1 - mx[x][y]) : i === 'turn off' ? 0 : 1; }
function sw2(i, x, y) { mx[x][y] = Math.max(mx[x][y] + (i === 'toggle' ? 2 : i === 'turn off' ? -1 : 1), 0); }

function processData(switchFunc) { 
    d.forEach(i => {
        let instruction = '';
        if (i.substring(0, 6) === 'toggle') instruction = 'toggle';
        if (i.substring(0, 7) === 'turn on') instruction = 'turn on';
        if (i.substring(0, 8) === 'turn off') instruction = 'turn off';
        remainder = i.substring(instruction.length + 1).split(' through ');
        let origin = remainder[0].split(',');
        let target = remainder[1].split(',');
        for(let x = parseInt(origin[0]); x <= parseInt(target[0]); ++x) {
            for(let y = parseInt(origin[1]); y <= parseInt(target[1]); ++y) {
                switchFunc(instruction, x, y);
            }
        }
    });
}

processData(sw1);
console.log('Part 1: ' + mx.flat().reduce((a, b) => a + b));

mx = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
processData(sw2);
console.log('Part 2: ' + mx.flat().reduce((a, b) => a + b));