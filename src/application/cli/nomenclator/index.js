const nomenclatorParser = require('./parser');
const fileName = process.argv[2];

if (!fileName) {
  console.log('Please pass the nomenclator.csv file as first argument');
  process.exit(9);
}

nomenclatorParser(process.argv[2])
  .then(divisions => console.log(JSON.stringify(divisions)));
