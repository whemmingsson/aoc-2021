module.exports = class CaveNode {
  constructor(label) {
    this.label = label;
    this.nodes = [];
    this.bigCave = CaveNode.isBigCave(label);
    this.visited = false; // For algorithm
    this.visitCount = 0;
  }

  static isBigCave(label) {
    return label.toUpperCase() === label;
  }

  unvisit() {
    this.visited = false;
    //this.visitCount--;
    this.visitCount--;
  }

  visit() {
    this.visited = true;
    this.visitCount++;
  }

  canVisit() {
    //return this.bigCave ? true : !this.visited;
    return this.bigCave ? true : this.visitCount < 3;
  }
};
