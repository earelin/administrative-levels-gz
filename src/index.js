const fileName = process.argv[2];

if (!fileName) {
  console.log('Please pass the nomenclator.csv file as first argument');
  process.exitCode = 9;
} else {
  console.log('file: ', process.argv[2]);
}
