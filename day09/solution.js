let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());
let G = {}, q = [], dists = [];

d.forEach(l => {
    vertices = l.split(' = ')[0].split(' to ');
    start = vertices[0], end = vertices[1];
    edge = parseInt(l.split(' = ')[1]);
    !G[start] ? G[start] = [[ end, edge ]] : G[start].push([ end, edge ]);
    !G[end]   ? G[end] = [[ start, edge ]] : G[end].push([ start, edge ]);
});

for(let i = 0; i != Object.keys(G).length; ++i) {
    q.push({'path': [Object.keys(G)[i]], 'dist': 0 });
}

while(q.length > 0) {
    let c = q.pop();
    let cPath = c['path'];
    if (c['path'].length === Object.keys(G).length) {
        dists.push(c['dist']);
        continue;
    }

    possibilities = G[cPath[cPath.length - 1]].filter(x => !cPath.includes(x[0]));
    for(let i = 0; i < possibilities.length; ++i) {
        p = possibilities[i];
        q.push({'path': cPath.concat([p[0]]), 'dist': c['dist'] + p[1]});
    }
}
console.log(Math.min(...dists), Math.max(...dists));