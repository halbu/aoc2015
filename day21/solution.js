let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());
W = [], A = [], R = [], loadouts = []

for (var i = 1; i <= d.length; ++i) {
  if (i >= 1 && i <= 5) {
    let wpn = d[i].split(/[ ]+/);
    W.push([parseInt(wpn[1]), parseInt(wpn[2]), parseInt(wpn[3]), wpn[0]])
  } else if (i >= 8 && i <= 12) {
    let arm = d[i].split(/[ ]+/);
    A.push([parseInt(arm[1]), parseInt(arm[2]), parseInt(arm[3]), arm[0]])
  } else if (i >= 15 && i <= 20) {
    let rng = d[i].split(/[ ]+/);
    R.push([parseInt(rng[2]), parseInt(rng[3]), parseInt(rng[4]), rng[0] + rng[1]])
  }
}

// Iterate all gear possibilities and store in `loadouts`, starting with weapons.
[...Array(A.length)].forEach((_, i) => chooseArmor(W[i][0], W[i][1], W[i][2]))

function chooseArmor(cost, damage, armor) {
  [...Array(A.length)].forEach((_, i) => chooseRing1(cost + A[i][0], damage + A[i][1], armor + A[i][2]))
  chooseRing1(cost, damage, armor) // Don't wear armor
}

function chooseRing1(cost, damage, armor) {
  [...Array(R.length)].forEach((_, i) => chooseRing2(cost + R[i][0], damage + R[i][1], armor + R[i][2], R[i][3]))
  chooseRing2(cost, damage, armor, "none") // Don't wear a ring in ring slot 1
}

function chooseRing2(cost, damage, armor, nameOfRing1) {
  [...Array(R.length)].forEach((_, i) => {
    if (R[i][3] !== nameOfRing1) { // Can't wear duplicate rings
      storeGearCombination(cost + R[i][0], damage + R[i][1], armor + R[i][2])
    }
  })
  storeGearCombination(cost, damage, armor) // Don't wear a ring in ring slot 2
}

function storeGearCombination(cost, damage, armor) { loadouts.push({ cost, damage, armor }) }

let lowestWinningCost = 999, highestLosingCost = 0;
loadouts.forEach(c => {
  if (fight(c.armor, c.damage) && c.cost < lowestWinningCost) lowestWinningCost = c.cost
  if (!fight(c.armor, c.damage) && c.cost > highestLosingCost) highestLosingCost = c.cost
})
console.log("Day 21 part 1 solution: " +  lowestWinningCost);
console.log("Day 21 part 2 solution: " +  highestLosingCost);

function fight(playerArmor, playerDamage) {
  let player = { hp: 100, armor: playerArmor, damage: playerDamage }
  let boss = { hp: 104, armor: 1, damage: 8 }

  while (player.hp > 0 && boss.hp > 0) {
    boss.hp -= Math.max(1, player.damage - boss.armor);
    if (boss.hp <= 0) { return true }
    player.hp -= Math.max(1, boss.damage - player.armor);
    if (player.hp <= 0) { return false }
  }
}