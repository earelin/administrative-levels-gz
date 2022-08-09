const _ = require('lodash');

function capitalizeWords(string) {
  return string.toLocaleLowerCase()
    .split(" ")
    .map(word => _.capitalize(word))
    .join(" ");
}

module.exports = {
  capitalizeWords
};
