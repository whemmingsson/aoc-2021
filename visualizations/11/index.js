/*
// Part 1
let matrix = new Matrix();
rows.forEach((r) => {
  matrix.addRow(r);
});

matrix.print(-1);

for (let i = 0; i < 100; i++) {
  matrix.increseEnergyLevel();
  matrix.flash();
  // matrix.print(i);
  matrix.reset();
}

console.log(matrix.numberOfFlashes);

// Part 2
matrix = new Matrix();
rows.forEach((r) => {
  matrix.addRow(r);
});

matrix.print(-1);

let counter = 0;
while (!matrix.isSyncronized) {
  matrix.increseEnergyLevel();
  matrix.flash();
  // matrix.print(i);
  matrix.reset();
  counter++;
}

console.log(counter);

*/
