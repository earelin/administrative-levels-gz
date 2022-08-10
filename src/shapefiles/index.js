const shapefilesParser = require('./parser');

const argv = require('yargs')
  .scriptName("shapefile-extract")
  .usage('$0 --provincia [shapefile]')
  .option('provincia', {
    alias: 'p',
    describe: 'Provincia',
    demandOption: true
  })
  .help()
  .argv;

shapefilesParser(argv.provincia)
  .then(result => console.log(JSON.stringify(result)));
