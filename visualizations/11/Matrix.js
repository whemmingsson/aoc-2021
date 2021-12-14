
class Matrix {
  constructor() {
    this.matrix = [];
    this.numberOfFlashes = 0;
    this.isSyncronized = false;
  }

  addRow(unparsedRow) {
    this.matrix.push(unparsedRow.split("").map((v) => ({ flashed: false, level: parseInt(v) })));
  }

  increseEnergyLevel() {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        let cell = this.matrix[y][x];
        cell.level++;
      }
    }
  }

  reset() {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        let cell = this.matrix[y][x];
        cell.flashed = false;
      }
    }
  }

  flash() {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        let cell = this.matrix[y][x];
        if (cell.level > 9 && !cell.flashed) {
          this._flashAt(x, y);
        }
      }
    }

    let flashes = 0;
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        let cell = this.matrix[y][x];
        if (cell.flashed) {
          cell.level = 0;
          flashes++;
        }
      }
    }

    if (flashes === 100) {
      this.isSyncronized = true;
    }
  }

  _flashAt(x, y) {
    let canFlash = (x, y) => {
      return this.matrix[y][x].level > 9 && !this.matrix[y][x].flashed;
    };

    this.numberOfFlashes++;

    const m = this.matrix;

    m[y][x].flashed = true;
    m[y][x].level = 0;

    // Top-left
    if (m[y - 1] && m[y - 1][x - 1]) {
      m[y - 1][x - 1].level++;
      if (canFlash(x - 1, y - 1)) this._flashAt(x - 1, y - 1);
    }

    // Top-middle
    if (m[y - 1] && m[y - 1][x]) {
      m[y - 1][x].level++;
      if (canFlash(x, y - 1)) this._flashAt(x, y - 1);
    }

    // Top right
    if (m[y - 1] && m[y - 1][x + 1]) {
      m[y - 1][x + 1].level++;
      if (canFlash(x + 1, y - 1)) this._flashAt(x + 1, y - 1);
    }

    // Middle left
    if (m[y] && m[y][x - 1]) {
      m[y][x - 1].level++;
      if (canFlash(x - 1, y)) this._flashAt(x - 1, y);
    }

    // Middle right
    if (m[y] && m[y][x + 1]) {
      m[y][x + 1].level++;
      if (canFlash(x + 1, y)) this._flashAt(x + 1, y);
    }

    // Bottom left
    if (m[y + 1] && m[y + 1][x - 1]) {
      m[y + 1][x - 1].level++;
      if (canFlash(x - 1, y + 1)) this._flashAt(x - 1, y + 1);
    }

    // Bottom middle
    if (m[y + 1] && m[y + 1][x]) {
      m[y + 1][x].level++;
      if (canFlash(x, y + 1)) this._flashAt(x, y + 1);
    }

    // Bottom right
    if (m[y + 1] && m[y + 1][x + 1]) {
      m[y + 1][x + 1].level++;
      if (canFlash(x + 1, y + 1)) this._flashAt(x + 1, y + 1);
    }

    m[y][x].level = 0;
  }

  /* P5 functionality */

  render() {
    let s = width / this.matrix.length;
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        let cell = this.matrix[y][x];

        let hue = map(cell.level, 0, 9, 75, 0);
        fill(hue, 100, 100);
        rect(x * s, y * s, s, s);

        fill(0, 0.1);
        textAlign(CENTER);
        textSize(24);
        text(cell.level, x * s + s / 2, y * s + s / 2 + 24 / 3)

      }
    }
  }




};
