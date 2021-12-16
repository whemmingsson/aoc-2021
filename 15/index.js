const Matrix = require("./Matrix.js");

const rows = require("../util/loader.js").getStrings("15/data");

// Part 1
const matrix = new Matrix();

rows.forEach((r) => {
  matrix.addRow(r);
});

//matrix.print();

//matrix.findShortestPath(0, 0, matrix.width - 1, matrix.height - 1);

//matrix.print();

// Part 2

const m2 = new Matrix();

rows.forEach((r) => {
  let newRow = r;
  let values = r.split("").map((v) => parseInt(v));
  for (i = 1; i < 5; i++) {
    newRow += values
      .map((v) => {
        if (v + i >= 10) return (v + i) % 9;
        return v + i;
      })
      .join("");
  }
  m2.addRow(newRow);
});

m2.extend();

m2.findShortestPath(0, 0, m2.width - 1, m2.height - 1);
