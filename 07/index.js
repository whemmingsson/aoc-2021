const values = require("../util/loader.js")
  .getStrings("07/data")[0]
  .split(",")
  .map((v) => parseInt(v));

const result = caluclateMinFuelCostAndPos((p, v) => Math.abs(p - v));
console.log("PART 1 -  Most efficient position: " + result.pos + " require " + result.cost + " fuel");

const result2 = caluclateMinFuelCostAndPos((p, v) => {
  const d = Math.abs(p - v);
  return (d + 1) * (d / 2);
});

console.log("PART 2 -  Most efficient position: " + result2.pos + " require " + result2.cost + " fuel");

function caluclateMinFuelCostAndPos(calcFuc) {
  let fuelCost = Number.MAX_SAFE_INTEGER;
  let mostEfficientPos = -1;

  for (let i = 0; i < Math.max(...values); i++) {
    const fuelCostForPos = values.reduce((p, c) => p + calcFuc(i, c), 0);

    if (fuelCostForPos < fuelCost) {
      fuelCost = fuelCostForPos;
      mostEfficientPos = i;
    }
  }
  return { pos: mostEfficientPos, cost: fuelCost };
}
