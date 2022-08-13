const csvParser = require('csv-parser');
const {AdminDivision, AdminDivisionsAggregator} = require('../../../domain/admin-levels');
const fs = require('fs');
const {capitalizeWords, undoCommaSplit} = require('../../../string-utils');

async function nomenclatorParse(file) {
  const divisions = new AdminDivisionsAggregator();

  const csvReader = fs.createReadStream(file)
    .pipe(csvParser({separator: ';'}));

  for await (const data of csvReader) {
    const province = addLevelToParent(divisions, data['CD PROVINCIA'], data['NOME PROVINCIA']);
    const council = addLevelToParent(province, data['CD CONCELLO'], data['NOME CONCELLO']);
    const parish = addLevelToParent(council, data['CD PARROQUIA'], data['NOME PARROQUIA']);
    addLevelToParent(parish, data['CD LUGAR'], data['NOME LUGAR']);
  }

  return divisions;
}

function addLevelToParent(parent, id, name) {
  let level = new AdminDivision(id, parsePlaceName(name));
  if (parent.hasSubLevel(level)) {
    level = parent.findSubLevelById(level.id);
  } else {
    parent.addSubLevel(level);
  }
  return level;
}

function parsePlaceName(string) {
  return  undoCommaSplit(capitalizeWords(string));
}

module.exports = nomenclatorParse;
