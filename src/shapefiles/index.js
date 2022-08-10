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

console.log(argv);
