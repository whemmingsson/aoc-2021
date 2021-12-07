const data = require("../util/loader.js")
  .getStrings("06/data")[0]
  .split(",")
  .map((v) => parseInt(v));

console.log(data);

let fishes = [...data];

let day = 0;
while (day < 80) {
  let newsFishesCount = 0;
  for (let i = 0; i < fishes.length; i++) {
    if (fishes[i] === 0) {
      newsFishesCount++;
      fishes[i] = 6;
    } else {
      fishes[i]--;
    }
  }

  for (let i = 0; i < newsFishesCount; i++) {
    fishes.push(8);
  }

  day++;
}

console.log("");
console.log("Result part 1: " + fishes.length);

// Part 2
fishes = [...data];
let totalFishCount = fishes.length;

// Initialize the "buckets"
let map = {};
for (let i = 0; i <= 8; i++) {
  map[i.toString()] = 0;
}

// Add initial fishes to buckets
for (let i = 0; i < fishes.length; i++) {
  const fish = fishes[i];
  map[fish]++;
}

console.log("Initial value");
console.log(map);

let fishCount = 0;

for (let i = 0; i < 20; i++) {
  fishCount = map["0"];

  // Move all values down 1 day
  for (let k = 0; k <= 7; k++) {
    const key = k.toString();
    const nextKey = next(key);
    map[key] = map[nextKey];
  }

  if (fishCount > 0) {
    totalFishCount += fishCount; // Increase total fish count
    map["6"] += fishCount; // "Reset" a value number of fish
    map["8"] = fishCount; // Spawn a value number of new fish
  }

  /// ----- DEBUGGING ------ ////

  console.log("Day" + (i + 1), totalFishCount);
  print(map);

  if (i == 79 && totalFishCount == 5934) {
    console.log("SUCCESS");
  } else if (i == 79 && totalFishCount != 5934) {
    console.log("FAIL");
    break;
  }
}

console.log("Result part 2: " + totalFishCount);

function next(k) {
  return (parseInt(k) + 1).toString();
}

function print(map) {
  console.log();
  console.log([...Array(9).keys()].join(" "));

  let values = "";

  for (const [, value] of Object.entries(map)) {
    values += value + " ";
  }

  console.log(values);
  console.log();
}
