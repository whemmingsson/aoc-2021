module.exports = class CaveNode {
  constructor(label) {
    this.label = label;
    this.nodes = [];
    this.bigCave = CaveNode.isBigCave(label);
    this.visited = false; // For algorithm
  }

  static isBigCave(label) {
    return label.toUpperCase() === label;
  }

  unvisit() {
    this.visited = false;
  }

  visit() {
    this.visited = true;
  }

  canVisit() {
    return this.bigCave ? true : !this.visited;
  }
};
