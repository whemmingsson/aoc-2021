const values = require("../util/loader.js")
  .getStrings("07/data")[0]
  .split(",")
  .map((v) => parseInt(v));

// Part 1
const result = caluclateMinFuelCostAndPos((p, v) => Math.abs(p - v));

console.log("PART 1 -  Most efficient position: " + result.pos + " require " + result.cost + " fuel");

// Part 2
const result2 = caluclateMinFuelCostAndPos((p, v) => {
  const d = Math.abs(p - v);
  return (d + 1) * (d / 2);
});

console.log("PART 2 -  Most efficient position: " + result2.pos + " require " + result2.cost + " fuel");

function caluclateMinFuelCostAndPos(calcFuc) {
  let fuelCost = Number.MAX_SAFE_INTEGER;
  let mostEfficentPosition = -1;

  for (let i = 0; i < Math.max(...values); i++) {
    let fuelCostForPos = 0;

    for (let j = 0; j < values.length; j++) {
      fuelCostForPos += calcFuc(i, values[j]);
    }

    if (fuelCostForPos < fuelCost) {
      fuelCost = fuelCostForPos;
      mostEfficentPosition = pos;
    }
  }
  return { pos: mostEfficentPosition, cost: fuelCost };
}
