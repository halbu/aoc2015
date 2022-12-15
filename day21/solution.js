let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());
W = [], A = [], R = [], loadouts = []

for (let i = 1; i != 21; ++i) {
  let slices = d[i].split(/[ ]+/);
  if (i >= 1 && i <= 5) {
    W.push([ parseInt(slices[1]), parseInt(slices[2]), parseInt(slices[3]), slices[0]])
  } else if (i >= 8 && i <= 12) {
    A.push([ parseInt(slices[1]), parseInt(slices[2]), parseInt(slices[3]), slices[0]])
  } else if (i >= 15 && i <= 20) {
    R.push([ parseInt(slices[2]), parseInt(slices[3]), parseInt(slices[4]), slices.slice(0, 1)])
  }
}
A.push([0, 0, 0, "none"])
R.push([0, 0, 0, "none"])

// Iterate all gear possibilities and store in `loadouts`, starting with weapons.
W.forEach(w => {
  A.forEach(a => {
    R.forEach(r => {
      R.forEach(r2 => {
        if (r[3] === r2[3]) return; // No duplicate rings
        loadouts.push({ cost: w[0]+a[0]+r[0]+r2[0], dmg: w[1]+a[1]+r[1]+r2[1], def: w[2]+a[2]+r[2]+r2[2]})
      })
    })
  })
})

loadouts.forEach(l => { l.won = fight(l.dmg, l.def) })
console.log("Day 21 part 1 solution: " + loadouts.filter(x => x.won).sort((a, b) => a.cost > b.cost ? 1 : -1)[0].cost)
console.log("Day 21 part 2 solution: " + loadouts.filter(x => !x.won).sort((a, b) => a.cost < b.cost ? 1 : -1)[0].cost)

function fight(dmg, def) {
  let player = { hp: 100, armor: def, damage: dmg }
  let boss = { hp: 104, armor: 1, damage: 8 }

  while (player.hp > 0 && boss.hp > 0) {
    boss.hp -= Math.max(1, player.damage - boss.armor);
    if (boss.hp <= 0) { return true }
    player.hp -= Math.max(1, boss.damage - player.armor);
    if (player.hp <= 0) { return false }
  }
}