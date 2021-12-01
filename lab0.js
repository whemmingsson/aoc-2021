var path = require("path");
var scriptName = path.basename(__filename);
const rgx = /\d+/;
console.log(rgx.exec(scriptName)[0]);
