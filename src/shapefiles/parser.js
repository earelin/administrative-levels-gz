const {AdminLevel, AdminLevelAggregator} = require('../admin-levels');
const shapefile = require('shapefile');

async function shapefilesParser(provincesShapefilePath) {
  const adminLevels = new AdminLevelAggregator();

  await readAdminLevels(adminLevels, provincesShapefilePath);

  return adminLevels;
}

async function readAdminLevels(parent, shapefile) {
  const source = await openShapefile(shapefile);

  let result;
  do {
    result = await source.read();
    if (!result.done) {
      const properties = result.value.properties;
      parent.addSubLevel(new AdminLevel(String(properties.CodPROV), properties.Provincia));
    }
  } while (!result.done);
}

async function openShapefile(path) {
  return shapefile.open(
    `${path}.shp`,`${path}.dbf`, {encoding: 'UTF-8'});
}

module.exports = shapefilesParser;
