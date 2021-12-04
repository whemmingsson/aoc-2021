const chalk = require("chalk");

module.exports = class Board {
  constructor(id) {
    this.id = id;
    this.matrix = [];
  }

  static size() {
    return 5;
  }

  addRow(values) {
    this.matrix.push(
      values.map((v) => {
        return { number: v, found: false };
      })
    );
  }

  markNumber(number) {
    for (let i = 0; i < Board.size(); i++) {
      for (let j = 0; j < Board.size(); j++) {
        let v = this.matrix[i][j];
        if (v.number === number) v.found = true;
      }
    }
  }

  print() {
    console.log("");
    console.log("BOARD " + this.id);
    for (let i = 0; i < Board.size(); i++) {
      let rowStr = this.matrix[i].map((v) => (v.found ? chalk.green(v.number) : v.number)).join(" ");
      console.log(rowStr);
    }
  }

  isWinner() {
    return this._isWinWithColumn() || this._isWinWithRow();
  }

  sum() {
    let sum = 0;
    for (let i = 0; i < Board.size(); i++) {
      for (let j = 0; j < Board.size(); j++) {
        let v = this.matrix[i][j];
        if (!v.found) sum += v.number;
      }
    }
    return sum;
  }

  _isWinWithRow() {
    for (let i = 0; i < Board.size(); i++) {
      if (this.matrix[i].filter((v) => v.found).length === Board.size()) {
        return true;
      }
    }
    return false;
  }

  _isWinWithColumn() {
    for (let i = 0; i < Board.size(); i++) {
      if (this.matrix.map((row) => row[i]).filter((c) => c.found).length === Board.size()) {
        return true;
      }
    }
    return false;
  }
};
