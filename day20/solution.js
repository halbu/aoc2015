// Ryzen 5600X to the rescue!
for(var i = 500000; i != Number.MAX_SAFE_INTEGER; ++i) {
  var houseTotal = 0
  for(var j = 1; j <= i; ++j) {
    if (i % j === 0) {
      houseTotal += (j * 10)
    }
  }
    
  if (houseTotal >= 36000000) {
    console.log("Day 20 part 1 solution: " + i)
    break;
  }
}

for(var i = 800000; i != Number.MAX_SAFE_INTEGER; ++i) {
  var houseTotal = 0
  for(var j = 1; j <= i; ++j) {
    if (!((i / j) > 50) && (i % j === 0)) {
      houseTotal += (j * 11)
    }
  }
    
  if (houseTotal >= 36000000) {
    console.log("Day 20 part 2 solution: " + i)
    break;
  }
}