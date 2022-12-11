let d = require('fs').readFileSync('data.txt').toString().split("\n").map(x => x.trim());

// Why is a shuffle function needed, you ask? The answer may surprise you! Read on...
function shuffle(arr) {
  let cIx = arr.length, randIx;
  while (cIx != 0) {
    randIx = Math.floor(Math.random() * cIx);
    cIx--;
    [arr[cIx], arr[randIx]] = [arr[randIx], arr[cIx]];
  }
  return arr;
}

// Build map of happiness relationships between all seated partygoers
let M = {}
for (let i = 0; i != d.length; ++i) {
  k = d[i].split(" ")[0], v = d[i].split(" ")[10].replace('.', '');
  if (!M[k]) M[k] = {}
  dh = d[i].split(" ")[2] === "lose" ? -parseInt(d[i].split(" ")[3]) : parseInt(d[i].split(" ")[3])
  M[k][v] = dh
}

// Repeatedly shuffle (yes, shuffle) the seating deck and note overall happiness for each shuffle
let seats = ["Alice", "Bob", "Carol", "David", "Eric", "Frank", "George", "Mallory"]
let happinesses = [];
for (let s = 0; s != 50000; ++s) {
  seats = shuffle(seats);
  let totalHappiness = 0;

  for (var i = 0; i != seats.length-1; ++i) {
    totalHappiness += (M[seats[i]][seats[i+1]] + M[ seats[i+1]][seats[i]])
  }
  totalHappiness += (M[seats[0]][seats[7]] + M[seats[7]][seats[0]])
  happinesses.push(totalHappiness)
}

console.log("Day 12 part 1 solution: " + Math.max(...happinesses));

// Add "Self" to seating arrangement & interpersonal happiness
seats.push("Self"); 
M["Self"] = {}
for (let i = 0; i != 8; ++i) {
  M["Self"][seats[i]] = 0, M[seats[i]]["Self"] = 0
}

// Then just run it again as before ¯\_(ツ)_/¯
happinesses = [];
for (let s = 0; s != 50000; ++s) {
  seats = shuffle(seats);
  let totalHappiness = 0;

  for (var i = 0; i != seats.length-1; ++i) {
    totalHappiness += (M[seats[i]][seats[i+1]] + M[ seats[i+1]][seats[i]])
  }
  totalHappiness += (M[seats[0]][seats[8]] + M[seats[8]][seats[0]])
  happinesses.push(totalHappiness)
}

console.log("Day 12 part 2 solution: " + Math.max(...happinesses));