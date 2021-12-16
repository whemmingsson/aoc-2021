let chalk = require("chalk");

module.exports = class Matrix {
  constructor() {
    this.matrix = [];
    this.numberOfFlashes = 0;
    this.isSyncronized = false;
    this.width = 0;
    this.height = 0;
    this.target = {}; // For algorithm
  }

  addRow(unparsedRow) {
    let cols = unparsedRow.split("");
    this.matrix.push(cols.map((v, i) => ({ value: parseInt(v), visitied: false, x: i, y: this.height })));
    this.height++;
    if (cols.length > this.width) {
      this.width = cols.length;
    }
  }

  extend() {
    let h = this.height;
    for (let j = 1; j < 5; j++) {
      for (let i = 0; i < h; i++) {
        let newRow = this.matrix[i]
          .map((n) => {
            if (n.value + j >= 10) return (n.value + j) % 9;
            return n.value + j;
          })
          .join("");
        this.addRow(newRow);
      }
    }
  }

  print() {
    this.matrix.forEach((row) => {
      console.log(row.map((v) => (v.visitied ? chalk.yellow(v.value) : v.value)).join(" "));
    });
  }

  findShortestPath(fromX, fromY, toX, toY) {
    console.log(`Finding shortest path from (${fromX},${fromY}) to (${toX}, ${toY})`);
    this.target = { x: toX, y: toY };

    let target = this.matrix[toY][toX];

    // Setup
    let S = [];
    let Q = {};
    let dist = {};
    let prev = {};
    let Qlength = 0;

    console.time("setup");
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let key = x + "," + y;
        //Q[key] = this.matrix[y][x];
        dist[key] = Number.MAX_SAFE_INTEGER;
      }
    }

    let sourceKey = fromX + "," + fromY;
    dist[sourceKey] = 0;
    Q[sourceKey] = this.matrix[fromX][fromY];
    Qlength = 1;
    console.timeEnd("setup");

    console.time("algorithm");

    while (Qlength >= 0) {
      // Find node u in Q with minimum dist[u]
      // Naive implementation.... Should be a min-prio queue for O(1) performance
      let min = Number.MAX_SAFE_INTEGER;
      let minKey = "";
      Object.keys(Q).forEach((key) => {
        if (dist[key] < min) {
          minKey = key;
          min = dist[key];
        }
      });

      let u = Q[minKey];

      delete Q[minKey];
      Qlength--;

      // Found target, construct path
      if (u === target) {
        S = [];
        while (u) {
          S.unshift(u);
          u = prev[u.x + "," + u.y];
        }
        break;
      }

      // Update dist and prev maps if
      let uK = u.x + "," + u.y;
      let adjacent = this.getAdjacent(u.x, u.y);
      adjacent.forEach((v) => {
        let vK = v.x + "," + v.y;
        let alt = dist[uK] + v.value;
        if (alt < dist[vK]) {
          dist[vK] = alt;
          prev[vK] = u;
          Q[vK] = v;
          Qlength++;
        }
      });
    }

    console.timeEnd("algorithm");

    console.time("summing");
    let sum = 0;
    S.forEach((n) => {
      this.matrix[n.y][n.x].visitied = true;
      sum += n.value;
    });
    console.timeEnd("summing");

    console.log("Sum: " + (sum - this.matrix[0][0].value));
  }

  _printNodeData(node) {
    console.log(`${node.value} (visited: ${node.visitied}) @ (${node.x},${node.y})`);
  }

  _findBestNode(adj) {
    let bestValue = 999999999;
    let bestNode = null;
    adj.forEach((a) => {
      if (a.value <= bestValue) {
        bestValue = a.value;
        bestNode = a;
      }
    });
    return bestNode;
  }

  getAdjacent(x, y) {
    const m = this.matrix;

    let adjacent = [];

    // TOP
    if (m[y - 1] && m[y - 1][x] && !m[y - 1][x].visitied) {
      adjacent.push(m[y - 1][x]);
    }

    // BOTTOM
    if (m[y + 1] && m[y + 1][x] && !m[y + 1][x].visitied) {
      adjacent.push(m[y + 1][x]);
    }

    // LEFT
    if (m[y] && m[y][x - 1] && !m[y][x - 1].visitied) {
      adjacent.push(m[y][x - 1]);
    }

    // RIGHT
    if (m[y] && m[y][x + 1] && !m[y][x + 1].visitied) {
      adjacent.push(m[y][x + 1]);
    }

    return adjacent;
  }
};
