module.exports = class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.points = this._createPoints();
  }

  _createPoints() {
    const points = [];
    if (this.p1.x === this.p2.x) {
      let minY = Math.min(this.p1.y, this.p2.y);
      let maxY = Math.max(this.p1.y, this.p2.y);
      for (let i = 0; i < maxY - minY + 1; i++) {
        points.push({ x: this.p1.x, y: minY + i });
      }
    } else if (this.p1.y === this.p2.y) {
      let minX = Math.min(this.p1.x, this.p2.x);
      let maxX = Math.max(this.p1.x, this.p2.x);
      for (let i = 0; i < maxX - minX + 1; i++) {
        points.push({ x: minX + i, y: this.p1.y });
      }
    } else {
      // Only part 2
      const from = Math.min(this.p1.x, this.p2.x) === this.p1.x ? this.p1 : this.p2;
      const to = from === this.p1 ? this.p2 : this.p1;

      let dX, dY;
      if (to.x > from.x) dX = 1;
      else dX = -1;

      if (to.y > from.y) dY = 1;
      else dY = -1;

      for (let i = 0; i < Math.abs(this.p1.x - this.p2.x) + 1; i++) {
        points.push({ x: from.x + i * dX, y: from.y + i * dY });
      }
    }

    return points;
  }
};
