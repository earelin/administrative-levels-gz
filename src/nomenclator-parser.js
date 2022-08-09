const csvParser = require('csv-parser');
const {Province, DivisionsAggregator} = require('./divisionsAggregator');
const fs = require('fs');
const {capitalizeWords, undoCommaSplit} = require('./string-utils');

async function nomenclatorParse(file) {
  const divisions = new DivisionsAggregator();

  const csvReader = fs.createReadStream(file)
    .pipe(csvParser({separator: ';'}));

  for await (const data of csvReader) {
    const province = new Province(data['CD PROVINCIA'], parsePlaceName(data['NOME PROVINCIA']));
    divisions.add(province);
  }

  return divisions;
}

function parsePlaceName(string) {
  return  undoCommaSplit(capitalizeWords(string));
}

module.exports = nomenclatorParse;
