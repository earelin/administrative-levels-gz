const shapefilesParser = require('./parser');

const argv = require('yargs')
  .scriptName("shapefile-extract")
  .usage('$0 -p [shapefiles_path] -c [shapefiles_path]')
  .option('parroquias', {
    alias: 'p',
    describe: 'Parroquias shapefiles path (no extension)',
    demandOption: true
  })
  .help()
  .argv;

shapefilesParser(argv.parroquias)
  .then(result => console.log(JSON.stringify(result)));
