const values = require("../util/loader.js")
  .getStrings("07/data")[0]
  .split(",")
  .map((v) => parseInt(v));

let validPositions = values.filter(onlyUnique);
let fuelCost = Number.MAX_SAFE_INTEGER;
let mostEfficentPosition = -1;

for (let i = 0; i < Math.max(...validPositions); i++) {
  let pos = i;
  let fuelCostForPos = 0;

  // Part 1
  /*for (let j = 0; j < values.length; j++) {
    fuelCostForPos += Math.abs(pos - values[j]);
  }*/

  // Part 2
  for (let j = 0; j < values.length; j++) {
    const diff = Math.abs(pos - values[j]);
    fuelCostForPos += (diff + 1) * (diff / 2);
  }

  //console.log("For position: " + pos + " fuel costs " + fuelCostForPos);

  if (fuelCostForPos < fuelCost) {
    fuelCost = fuelCostForPos;
    mostEfficentPosition = pos;
  }
}

console.log("Most efficient position: " + mostEfficentPosition + " require " + fuelCost + " fuel");

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
