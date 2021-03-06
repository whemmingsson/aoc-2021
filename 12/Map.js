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
    let numPaths = Map.countPathsRec(start, [start], "");
    return numPaths;
  }

  static countPathsRec(fromNode, path, tab) {
    if (fromNode.label === "end") {
      console.log(tab + "Path end : " + path.map((p) => p.label).join(" -> "));
      //path.forEach((n) => n.unvisit()); // Reset the visit conter
      return 1;
    }

    fromNode.visit();

    let numPaths = 0;
    fromNode.nodes.forEach((n) => {
      if (n.canVisit()) {
        path.push(n);
        numPaths += Map.countPathsRec(n, path, tab + "  ");
        path.splice(
          path.findIndex((node) => node.label === n.label),
          1
        );
      }
    });

    fromNode.unvisit();

    return numPaths;
  }
};
