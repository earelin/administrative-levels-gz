const ShapefilesParser = require('./parser');

const argv = require('yargs')
  .scriptName("shapefile-extract")
  .usage('$0 -p [shapefiles_path] -c [shapefiles_path]')
  .option('provincias', {
    alias: 'p',
    describe: 'Provincias shapefiles path (no extension)',
    demandOption: true
  })
  .option('comarcas', {
    alias: 'c',
    describe: 'Comarcas shapefiles path (no extension)',
    demandOption: true
  })
  .option('concellos', {
    alias: 'o',
    describe: 'Concellos shapefiles path (no extension)',
    demandOption: true
  })
  .option('parroquias', {
    alias: 'r',
    describe: 'Parroquias shapefiles path (no extension)',
    demandOption: true
  })
  .option('entidades', {
    alias: 'e',
    describe: 'Entidades de poboacion shapefiles path (no extension)',
    demandOption: true
  })
  .help()
  .argv;

const shapefileParser = new ShapefilesParser(
  argv.provincias,
  argv.comarcas,
  argv.concellos,
  argv.parroquias,
  argv.entidades);
shapefileParser.parse()
  .then(result => console.log(JSON.stringify(result)));
