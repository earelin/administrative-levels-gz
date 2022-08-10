const {AdminLevel, AdminLevelAggregator} = require('../admin-levels');

function shapefilesParser(provincesShapefilePath) {
  const divions = new AdminLevelAggregator();
  divions.addSubLevel(new AdminLevel('15', 'A Coruña'));
  return divions;
}

module.exports = shapefilesParser;
