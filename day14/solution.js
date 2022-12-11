let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());
let deer = [], M = {}, sec = 0

for (let i = 0; i != d.length ; ++i) {
  deer.push({
    name: d[i].split(" ")[0],
    speed: parseInt(d[i].split(" ")[3]),
    maxTimeFlying: parseInt(d[i].split(" ")[6]),
    maxTimeResting: parseInt(d[i].split(" ")[13]),
    timeFlying: 0,
    timeResting: 0,
    dist: 0
  })
}

while (++sec < 2504) {
  deer.forEach(r => {
    if (r.timeFlying === r.maxTimeFlying) {
      if (++r.timeResting === r.maxTimeResting) {
        r.timeFlying = r.timeResting = 0
      }
    } else {
      r.dist += r.speed
      r.timeFlying++
    }
  })

  deer.filter(r => r.dist === Math.max(...deer.map(r => r.dist))).forEach(r => !M[r.name] ? M[r.name] = 1 : M[r.name]++)
} 
console.log("Day 13 part 1 solution: " + Math.max(...deer.map(r => r.dist)))
console.log("Day 13 part 2 solution: "); console.table(M);
