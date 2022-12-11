let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());

// Got to parse all the ingredients in a single line. Readability be damned!! These bytes don't grow on trees
ingredients = d.map(l => [" capacity ", " durability ", " flavor ", " texture ", " calories "].map(x => parseInt(l.split(x)[1].split(",")[0]) ))

// I am going to do this by randomly mutating the mixture and testing for score increase
function getBestScore(calorieConstraint) {
  var highScore = 0;
  var spoons = [25, 25, 25, 25], best = [25, 25, 25, 25]

  // Half a mil is the lowest number of iterations that seems to guarantee correctness
  for (let i = 0; i != 500000; ++i) {
    spoons = best
    var iInc = Math.floor(Math.random() * 4), iDec = Math.floor(Math.random() * 4)

    while (iDec === iInc) {
      iDec = Math.floor(Math.random() * 4)
    }

    if (spoons[iDec] === 0 || spoons[iInc] > 97) continue;

    spoons[iDec]--
    spoons[iInc]++

    var mixture = [0, 0, 0, 0, 0]

    for (let j = 0; j != ingredients.length; ++j) {
      for (let s = 0; s != spoons[j]; ++s) {
        [...Array(5)].forEach((_, m) => mixture[m] += ingredients[j][m]);
      }
    }
    [...Array(5)].forEach((_, k) => { if (mixture[k] < 0) mixture[k] = 0; })

    var score = mixture[0] * mixture[1] * mixture[2] * mixture[3]
    var calories = mixture[4]

    if (score > highScore && calories <= calorieConstraint) {
      highScore = score
      best = spoons
    }
  }
  return highScore;
}

console.log("Day 15 part 1 solution: " + getBestScore(Number.MAX_SAFE_INTEGER))
console.log("Day 15 part 2 solution: " + getBestScore(500))