const chalk = require("chalk");

module.exports = class Board {
  constructor(id) {
    this.id = id;
    this.height = 5;
    this.width = 5;
    this.matrix = [];
    this.rows = 0;
  }

  addRow(values) {
    this.matrix.push(
      values.map((v) => {
        return { number: v, found: false };
      })
    );
    this.rows++;
  }

  markNumber(number) {
    for (let i = 0; i < this.height; i++) {
      let r = this.matrix[i];
      for (let j = 0; j < this.width; j++) {
        let v = r[j];
        if (v.number === number) v.found = true;
      }
    }
  }

  print() {
    console.log("");
    console.log("BOARD " + this.id);
    for (let i = 0; i < this.height; i++) {
      let rowStr = this.matrix[i].map((v) => (v.found ? chalk.green(v.number) : v.number)).join(" ");
      console.log(rowStr);
    }
  }

  isWinner() {
    // Validate rows
    for (let i = 0; i < this.matrix.length; i++) {
      if (this.matrix[i].filter((v) => v.found).length === this.width) {
        return true;
      }
    }

    // Validate columns
    for (let i = 0; i < this.width; i++) {
      let column = this.matrix.map((row) => row[i]);
      if (column.filter((c) => c.found).length === this.height) {
        return true;
      }
    }

    return false;
  }

  sum() {
    let sum = 0;
    for (let i = 0; i < this.height; i++) {
      let r = this.matrix[i];
      for (let j = 0; j < this.width; j++) {
        let v = r[j];
        if (!v.found) sum += v.number;
      }
    }
    return sum;
  }
};
