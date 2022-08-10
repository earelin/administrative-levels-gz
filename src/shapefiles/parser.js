const {AdminLevel, AdminLevelAggregator} = require('../admin-levels');
const shapefile = require('shapefile');

async function shapefilesParser(parroquiasShapefilePath) {
  const adminLevels = new AdminLevelAggregator();

  const source = await openShapefile(parroquiasShapefilePath);

  let result;
  do {
    result = await source.read();
    if (!result.done) {
      const properties = result.value.properties;

      const province = addLevelToParent(adminLevels, properties.CodPROV, properties.Provincia);
      const comarca = addLevelToParent(province, properties.CodCOM, properties.Comarca);
      const concello = addLevelToParent(comarca, properties.CodCONC, properties.Concello);
      addLevelToParent(concello, properties.CodPARRO, properties.Parroquia);
    }
  } while (!result.done);

  return adminLevels;
}

function addLevelToParent(parent, id, name) {
  let level = new AdminLevel(String(id), name);
  if (parent.hasSubLevel(level)) {
    level = parent.findSubLevelById(level.id);
  } else {
    parent.addSubLevel(level);
  }
  return level;
}

async function openShapefile(path) {
  return shapefile.open(
    `${path}.shp`,`${path}.dbf`, {encoding: 'UTF-8'});
}

module.exports = shapefilesParser;
