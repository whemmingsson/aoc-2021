const rows = require("../util/loader.js").getStrings("09/data");

// Part 1
const minPoints = [];
for (let i = 0; i < rows.length; i++) {
  const row = rows[i];

  for (let j = 0; j < row.length; j++) {
    const height = parseInt(row[j]);
    const adjacents = getAdjacent(i, j);
    if (adjacents.filter((a) => a.height > height).length === adjacents.length) minPoints.push({ x: j, y: i, height: height });
  }
}

console.log(minPoints.map((p) => p.height + 1).reduce((p, c) => p + c, 0));

// Part two
let checked = {};
let basinSizes = [];
minPoints.forEach((p) => {
  checked = {};
  findBasin(p.y, p.x);
  basinSizes.push(Object.keys(checked).length);
});

basinSizes.sort((a, b) => {
  return b - a;
});

console.log(basinSizes.filter((_, i) => i <= 2).reduce((p, c) => p * c, 1));

// Helper functions
function getAdjacent(row, col) {
  let result = [];

  if (rows[row - 1] && rows[row - 1][col]) result.push({ x: col, y: row - 1, height: parseInt(rows[row - 1][col]) });
  if (rows[row][col - 1]) result.push({ x: col - 1, y: row, height: parseInt(rows[row][col - 1]) });
  if (rows[row + 1] && rows[row + 1][col]) result.push({ x: col, y: row + 1, height: parseInt(rows[row + 1][col]) });
  if (rows[row][col + 1]) result.push({ x: col + 1, y: row, height: parseInt(rows[row][col + 1]) });

  return result;
}

function findBasin(i, j) {
  checked[j + "," + i] = true;
  getAdjacent(i, j).forEach((a) => {
    if (a.height === 9 || checked[a.x + "," + a.y]) return;
    findBasin(a.y, a.x);
  });
}
