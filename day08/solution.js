let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());
strings = d.map(x => x.substring(1, x.length - 1))
           .map(x => x.replace(new RegExp(/\\\\/, 'g'), 'B'))
           .map(x => x.replace(new RegExp(/\\"/, 'g'), 'Q'))
           .map(x => x.replace(new RegExp(/\\x[0-9a-f][0-9a-f]/, 'g'), 'A'));

let result = 0;
for (var i = 0; i != d.length; ++i) {
    result += (d[i].length - strings[i].length)
}
console.log(result)

encodings = d.map(x => x.replace(new RegExp(/\\/, 'g'), '\\\\'))
             .map(x => x.replace(new RegExp(/"/, 'g'), '\\"'))
             .map(x => '"' + x + '"');

result = 0;
for (var i = 0; i != d.length; ++i) {
    result += encodings[i].length - d[i].length
}
console.log(result)