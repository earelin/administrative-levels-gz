const {AdminLevel, AdminLevelAggregator} = require('../admin-levels');
const shapefile = require('shapefile');

async function shapefilesParser(provincesShapefilePath) {
  const source = await openShapefile(provincesShapefilePath);

  return readAdminLevels(source);
}

async function readAdminLevels(source) {
  const adminLevels = new AdminLevelAggregator();

  let result;
  do {
    result = await source.read();
    if (!result.done) {
      const properties = result.value.properties;
      adminLevels.addSubLevel(new AdminLevel(String(properties.CodPROV), properties.Provincia));
    }
  } while (!result.done);

  return adminLevels;
}

async function openShapefile(path) {
  return shapefile.open(
    `${path}.shp`,`${path}.dbf`, {encoding: 'UTF-8'});
}

module.exports = shapefilesParser;
