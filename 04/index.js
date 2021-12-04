const Board = require("./board.js");
const rows = require("../util/loader.js")
  .getStrings("04/data")
  .filter((r) => r !== "");

// Numbers to draw
const numbers = rows[0].split(",").map((n) => parseInt(n));

// Part 1
let boards = setupBpoards();
console.log("PART ONE");
for (i = 0; i < numbers.length; i++) {
  boards.forEach((b) => {
    b.markNumber(numbers[i]);
  });

  let winner = boards.find((b) => b.isWinner());

  if (winner) {
    winner.print();
    console.log("------------");
    console.log("Score " + winner.sum() * numbers[i]);
    break;
  }
}

// Part 2
console.log(numbers);
let boards = setupBpoards();
console.log("PART TWO");
for (i = 0; i < numbers.length; i++) {
  console.log("Drawing number: " + numbers[i]);
  boards.forEach((b) => {
    b.markNumber(numbers[i]);
  });

  let winners = boards.filter((b) => b.isWinner());

  if (winners.length === 0) {
    console.log("No winners");
  } else if (winners.length === 1 && boards.length === 1) {
    console.log("Final winner");
    winners[0].print();
    console.log("Score " + winners[0].sum() * numbers[i]);
    break;
  } else if (winners.length >= 1) {
    for (let j = 0; j < winners.length; j++) {
      let winner = winners[j];
      let index = boards.findIndex((b) => b.id === winner.id);
      console.log("Board " + winner.id + " won and will be eliminated (has index: " + index + ")");
      winner.print();
      boards.splice(index, 1);
    }
  }
  console.log("Boards left: " + boards.map((b) => b.id).join(","));
  console.log("-----------------");
}

function setupBpoards() {
  let boards = [];
  let b = null;
  for (let i = 1; i < rows.length; i++) {
    if ((i - 1) % 5 === 0) {
      b = new Board(boards.length + 1);
      boards.push(b);
    }
    b.addRow(
      rows[i]
        .split(" ")
        .filter((v) => v !== "")
        .map((v) => parseInt(v))
    );
  }
  return boards;
}
