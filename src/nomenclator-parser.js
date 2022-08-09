const csvParser = require('csv-parser');
const {Province, Divisions} = require('./divisions');
const fs = require('fs');
const {capitalize} = require('./string-utils');

async function nomenclatorParse(file) {
  const divisions = new Divisions();

  const csvReader = fs.createReadStream(file)
    .pipe(csvParser({separator: ';'}));

  for await (const data of csvReader) {
    const province = new Province(data['CD PROVINCIA'], capitalize(data['NOME PROVINCIA']));
    divisions.add(province);
  }

  return divisions;
}

module.exports = nomenclatorParse;
