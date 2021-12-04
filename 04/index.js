const Board = require("./board.js");
const rows = require("../util/loader.js")
  .getStrings("04/data")
  .filter((r) => r !== "");

// Numbers to draw
const numbers = rows[0].split(",").map((n) => parseInt(n));

// Part 1
let boards = setupBoards();
for (i = 0; i < numbers.length; i++) {
  markNumbers(numbers[i]);

  const winner = boards.find((b) => b.isWinner());

  if (winner) {
    console.log("Part 1 Score " + winner.sum() * numbers[i]);
    break;
  }
}

// Part 2
boards = setupBoards();

for (i = 0; i < numbers.length; i++) {
  markNumbers(numbers[i]);

  const winners = boards.filter((b) => b.isWinner());

  if (winners.length === 1 && boards.length === 1) {
    console.log("Part 2 Score " + winners[0].sum() * numbers[i]);
    break;
  } else if (winners.length >= 1) {
    for (let j = 0; j < winners.length; j++) {
      boards.splice(
        boards.findIndex((b) => b.id === winners[j].id),
        1
      );
    }
  }
}

function markNumbers(n) {
  boards.forEach((b) => {
    b.markNumber(n);
  });
}

function setupBoards() {
  const boards = [];
  let b = null;
  for (let i = 1; i < rows.length; i++) {
    if ((i - 1) % Board.size() === 0) {
      b = new Board(boards.length);
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
