const {AdminDivision, AdminDivisionsAggregator, AdminDivisionTypes} = require('../../../domain/admin-levels');
const shapefile = require('shapefile');
const {extractIneCodeComponents} = require('../../../string-utils');

async function shapefilesParser(parroquiasShapefilePath, poboacionsShapefilePath) {
  const poboacions = await processPoboacionsShapefile(poboacionsShapefilePath);

  const adminLevels = new AdminDivisionsAggregator();
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

      const province = addLevelToParent(
        adminLevels,
        properties.CodPROV,
        properties.Provincia,
        AdminDivisionTypes.Provincia);
      const comarca = addLevelToParent(
        province,
        properties.CodCOM,
        properties.Comarca,
        AdminDivisionTypes.Comarca);
      const concello = addLevelToParent(
        comarca,
        properties.CodCONC,
        properties.Concello,
        AdminDivisionTypes.Concello);
      const parroquia = addLevelToParent(
        concello,
        properties.CodPARRO,
        properties.Parroquia,
        AdminDivisionTypes.Parroquia);

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

      const poboacion = new AdminDivision(
        properties.COD_INE9,
        sanitizedName,
        AdminDivisionTypes.Poboacion,
        alternativeNames);

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

function addLevelToParent(parent, id, name, type, geometry = null) {
  const {sanitizedName, alternativeNames} = sanitizeName(name);

  let level = new AdminDivision(String(id), sanitizedName, type, alternativeNames, geometry);
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
