const data = require("../util/loader.js")
  .getStrings("06/example")[0]
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

let map = {};
for (let i = 0; i <= 8; i++) {
  map[i.toString()] = 0;
}

for (let i = 0; i < fishes.length; i++) {
  let fish = fishes[i];
  map[fish]++;
}

function next(k) {
  return (parseInt(k) + 1).toString();
}

console.log("Initial value");
console.log(map);

for (let i = 0; i < 256; i++) {
  let value = map["0"];

  // Move all values down 1 day
  for (let k = 0; k <= 7; k++) {
    let key = k.toString();
    const nextKey = next(key);
    map[key] = map[nextKey];
  }

  if (value > 0) {
    totalFishCount += value; // Increase total fish count
    map["6"] += value; // "Reset" a value number of fish
    map["8"] += value; // Spawn a value number of new fish
    //map["0"] = 0;
  }

  console.log("Day" + (i + 1), totalFishCount);
}

console.log("Result part 2: " + totalFishCount);
