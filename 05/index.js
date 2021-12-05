const Line = require("./line.js");
const rows = require("../util/loader.js").getStrings("05/data");

console.log("Rows: " + rows.length);

const regex = /(\d+),(\d+) -> (\d+),(\d+)/;

// Part 1
let lines = [];

rows.forEach((r) => {
  res = regex.exec(r);
  let p1 = { x: parseInt(res[1]), y: parseInt(res[2]) };
  let p2 = { x: parseInt(res[3]), y: parseInt(res[4]) };

  // Part one condition
  if (p1.x === p2.x || p1.y === p2.y) {
    lines.push(new Line(p1, p2));
  }
});

let dict = createPointsDictionary();
let crossings = countCrossings();
console.log("Result part 1: " + crossings);

// Part 2
lines = [];
rows.forEach((r) => {
  res = regex.exec(r);
  lines.push(new Line({ x: parseInt(res[1]), y: parseInt(res[2]) }, { x: parseInt(res[3]), y: parseInt(res[4]) }));
});

dict = createPointsDictionary();
crossings = countCrossings();
console.log("Result part 2: " + crossings);

function key(p) {
  return p.x + "," + p.y;
}

function countCrossings() {
  let crossings = 0;
  for (const [key, value] of Object.entries(dict)) {
    if (value > 1) {
      crossings++;
    }
  }
  return crossings;
}

function createPointsDictionary() {
  let dict = {};
  lines.forEach((l) => {
    l.points.forEach((p) => {
      let k = key(p);
      if (dict[k]) {
        dict[k]++;
      } else {
        dict[k] = 1;
      }
    });
  });
  return dict;
}
