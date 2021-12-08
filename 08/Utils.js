module.exports = {
  replaceAll: (str, search, replacement) => {
    //return str.replace(new RegExp(search, "g"), replacement);
    return str.split(search).join(replacement);
  },
};
