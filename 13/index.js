const rows = require("../util/loader.js").getStrings("13/data");

let coordinates = [];
let folds = [];

rows.forEach((r) => {
  if (r.indexOf(",") >= 0) {
    let [x, y] = r.split(",");
    coordinates.push({ x: parseInt(x), y: parseInt(y) });
  } else if (r.indexOf("=") >= 0) {
    let [pos, value] = r.split("=");
    folds.push({ pos: pos.substring(pos.length - 1, pos.length), value: parseInt(value) });
  }
});

//console.log(coordinates);
//console.log(folds);

// Part 1
const fold = folds[0];

let count = 0;
if (fold.pos == "y") {
  const toNotReflect = coordinates.filter((c) => c.y <= fold.value);
  const toReflect = coordinates.filter((c) => c.y > fold.value);

  count = toNotReflect.length;
  for (let i = 0; i < toReflect.length; i++) {
    let pos = toReflect[i];
    let yDiff = Math.abs(fold.value - pos.y);
    if (toNotReflect.find((c) => c.x === pos.x && c.y === fold.value - yDiff)) {
      // Nah
    } else {
      count++;
    }
  }
} else {
  const toNotReflect = coordinates.filter((c) => c.x <= fold.value);
  const toReflect = coordinates.filter((c) => c.x > fold.value);

  count = toNotReflect.length;
  for (let i = 0; i < toReflect.length; i++) {
    let pos = toReflect[i];
    let xDiff = Math.abs(fold.value - pos.x);
    if (toNotReflect.find((c) => c.y === pos.y && c.x === fold.value - xDiff)) {
      // Nah
    } else {
      count++;
    }
  }
}

// Part 2
let map = [...coordinates];

//console.log("\n");
//renderAsMatrix(map);

folds.forEach((fold) => {
  const positionsToRemove = [];
  if (fold.pos == "y") {
    const toReflect = map.filter((c) => c.y > fold.value);

    for (let i = 0; i < toReflect.length; i++) {
      let pos = toReflect[i];
      let yDiff = Math.abs(fold.value - pos.y);
      positionsToRemove.push(map.findIndex((p) => p.x === pos.x && p.y === pos.y));
      if (map.find((c) => c.x === pos.x && c.y === fold.value - yDiff)) {
        // Nah
      } else {
        map.push({ x: pos.x, y: fold.value - yDiff });
      }
    }
  } else {
    const toReflect = map.filter((c) => c.x > fold.value);

    for (let i = 0; i < toReflect.length; i++) {
      let pos = toReflect[i];
      let xDiff = Math.abs(fold.value - pos.x);
      positionsToRemove.push(map.findIndex((p) => p.x === pos.x && p.y === pos.y));
      if (map.find((c) => c.y === pos.y && c.x === fold.value - xDiff)) {
        // Nah
      } else {
        // Add a new point (or "move" it)
        map.push({ x: fold.value - xDiff, y: pos.y });
      }
    }
  }

  for (let p = positionsToRemove.length - 1; p >= 0; p--) {
    map.splice(positionsToRemove[p], 1);
  }

  //console.log("\n");
  //renderAsMatrix(map);
});

console.log("\n");
renderAsMatrix(map);

function renderAsMatrix(coords) {
  let maxY = Math.max(...coords.map((c) => c.y));
  let maxX = Math.max(...coords.map((c) => c.x));

  for (let y = 0; y <= maxY; y++) {
    const onThisYValue = coords.filter((c) => c.y === y);

    let lineToPrint = "";
    for (let x = 0; x <= maxX; x++) {
      lineToPrint += onThisYValue.filter((c) => c.x === x).length ? "#" : " ";
    }

    console.log(lineToPrint);
  }
}
