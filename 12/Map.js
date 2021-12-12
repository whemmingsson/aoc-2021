const CaveNode = require("./CaveNode");

module.exports = class Map {
  constructor() {
    this.nodes = [];
  }

  addNode(label) {
    if (this.nodes.findIndex((n) => n.label === label) >= 0) return;

    let node = new CaveNode(label);
    this.nodes.push(node);
    return node;
  }

  addLink(from, to) {
    let fromNode = this.nodes.find((n) => n.label === from);
    if (!fromNode) fromNode = this.addNode(from);

    let toNode = this.nodes.find((n) => n.label === to);
    if (!toNode) toNode = this.addNode(to);

    fromNode.nodes.push(toNode);
    toNode.nodes.push(fromNode);
  }

  getStartNode() {
    return this.nodes.find((n) => n.label === "start");
  }

  print() {
    let getConnections = (n) => {
      if (n.nodes.length == 0) return "No connections";

      return n.nodes.map((n) => n.label).join(",");
    };

    this.nodes.forEach((n) => {
      console.log(n.label + " [" + (n.bigCave ? "big" : "small") + "] " + getConnections(n));
    });
  }

  countPaths() {
    let start = this.getStartNode();
    let numPaths = Map.countPathsRec(start, [], "");
    return numPaths;
  }

  static countPathsRec(fromNode, path, tab) {
    if (fromNode.label === "end") {
      // We have reached the end here. How do we "clear" the path?
      console.log(tab + "Path end : " + path.map((p) => p.label).join(" -> "));
      return 1;
    }

    fromNode.visit();

    path.push(fromNode);

    let numPaths = 0;
    fromNode.nodes.forEach((n) => {
      console.log(tab + "From: " + fromNode.label + " to: " + n.label + " (can continue: " + n.canVisit() + ")");
      if (n.canVisit()) {
        //path.push(fromNode);
        numPaths += Map.countPathsRec(n, path, tab + "  ");
        //path = [];
      }
    });

    return numPaths;
  }
};
