const {AdminLevel, AdminLevelAggregator, LevelTypes} = require('../../../domain/admin-levels');
const shapefile = require('shapefile');
const {extractIneCodeComponents} = require('../../../string-utils');

async function shapefilesParser(parroquiasShapefilePath, poboacionsShapefilePath) {
  const poboacions = await processPoboacionsShapefile(poboacionsShapefilePath);

  const adminLevels = new AdminLevelAggregator();
  await processParroquiasShapefile(poboacions, parroquiasShapefilePath, adminLevels);

  return adminLevels;
}

async function processParroquiasShapefile(poboacions, shapefilePath, adminLevels) {
  const source = await openShapefile(shapefilePath);

  let result;
  do {
    result = await source.read();
    if (!result.done) {
      const properties = result.value.properties;

      const province = addLevelToParent(adminLevels, properties.CodPROV, properties.Provincia, LevelTypes.Provincia);
      const comarca = addLevelToParent(province, properties.CodCOM, properties.Comarca, LevelTypes.Comarca);
      const concello = addLevelToParent(comarca, properties.CodCONC, properties.Concello, LevelTypes.Concello);
      const parroquia = addLevelToParent(concello, properties.CodPARRO, properties.Parroquia, LevelTypes.Parroquia);

      poboacions.get(parroquia.id)
        ?.forEach(poboacion => parroquia.addSubLevel(poboacion));
    }
  } while (!result.done);
}

async function processPoboacionsShapefile(shapefilePath) {
  const source = await openShapefile(shapefilePath);

  const parroquiasPoboacions = new Map();

  let result;
  do {
    result = await source.read();
    if (!result.done) {
      const properties = result.value.properties;
      const poboacionTree = extractIneCodeComponents(properties.COD_INE9);
      const {sanitizedName, alternativeNames} = sanitizeName(properties.NOME10);
      const geometry = featureWrap(result.value.geometry);

      const poboacion = new AdminLevel(
        properties.COD_INE9,
        sanitizedName,
        LevelTypes.Poboacion,
        alternativeNames,
        geometry);

      if (parroquiasPoboacions.has(poboacionTree.parroquia)) {
        const parroquiaPoboacions = parroquiasPoboacions.get(poboacionTree.parroquia);
        parroquiaPoboacions.push(poboacion);
      } else {
        parroquiasPoboacions.set(poboacionTree.parroquia, [poboacion]);
      }
    }
  } while (!result.done);

  return parroquiasPoboacions;
}

function featureWrap(geometry) {
  return {
    type: 'Feature',
    geometry
  };
}

function addLevelToParent(parent, id, name, type) {
  const {sanitizedName, alternativeNames} = sanitizeName(name);

  let level = new AdminLevel(String(id), sanitizedName, type, alternativeNames);
  if (parent.hasSubLevel(level)) {
    level = parent.findSubLevelById(level.id);
  } else {
    parent.addSubLevel(level);
  }
  return level;
}

function sanitizeName(name) {
  if (name && name.includes('(')) {
    return {
      sanitizedName: name.slice(0, name.indexOf('(')).trim(),
      alternativeNames: [name.slice(name.indexOf('(') + 1 , name.indexOf(')'))]
    }
  }

  return {
    sanitizedName: name,
    alternativeNames: []
  };
}

async function openShapefile(path) {
  return shapefile.open(
    `${path}.shp`,`${path}.dbf`, {encoding: 'UTF-8'});
}

module.exports = shapefilesParser;
