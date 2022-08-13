const {AdminDivision, AdminDivisionsAggregator, AdminDivisionTypes} = require('../../../domain/admin-levels');
const shapefile = require('shapefile');
const {extractIneCodeComponents} = require('../../../string-utils');

class ShapefilesParser {
  constructor(provinciasShapefilePath, comarcasShapefilePath, concellosShapefilePath, parroquiasShapefilePath, poboacionsShapefilePath) {
    this.provinciasShapefilePath = provinciasShapefilePath;
    this.comarcasShapefilePath = comarcasShapefilePath;
    this.concellosShapefilePath = concellosShapefilePath;
    this.parroquiasShapefilePath = parroquiasShapefilePath;
    this.poboacionsShapefilePath = poboacionsShapefilePath;
  }

  async parse() {
    this.geoInfo = await this.#extractGeoInfo();
    this.geoInfo.poboacions = await this.#extractPoboacions();
    return await this.#processParroquiasShapefile();
  }

  async #extractGeoInfo() {
    return  {
      provincias: await extractGeoInformation(this.provinciasShapefilePath, 'CodPROV'),
      comarcas: await extractGeoInformation(this.comarcasShapefilePath, 'CodCOM'),
      concellos: await extractGeoInformation(this.concellosShapefilePath, 'CodCONC')
    };
  }

  async #extractPoboacions() {
    return processPoboacionsShapefile(this.poboacionsShapefilePath);
  }

  async #processParroquiasShapefile() {
    const adminDivisions = new AdminDivisionsAggregator();

    const source = await openShapefile(this.parroquiasShapefilePath);

    let result;
    do {
      result = await source.read();
      if (!result.done) {
        const properties = result.value.properties;

        const province = addLevelToParent(
          adminDivisions,
          properties.CodPROV,
          properties.Provincia,
          AdminDivisionTypes.Provincia);
        province.geometry = this.geoInfo.provincias.get(province.id);

        const comarca = addLevelToParent(
          province,
          properties.CodCOM,
          properties.Comarca,
          AdminDivisionTypes.Comarca);
        comarca.geometry = this.geoInfo.comarcas.get(comarca.id);

        const concello = addLevelToParent(
          comarca,
          properties.CodCONC,
          properties.Concello,
          AdminDivisionTypes.Concello);
        concello.geometry = this.geoInfo.concellos.get(concello.id);

        const parroquia = addLevelToParent(
          concello,
          properties.CodPARRO,
          properties.Parroquia,
          AdminDivisionTypes.Parroquia);
        parroquia.geometry = result.value.geometry;

        this.geoInfo.poboacions.get(parroquia.id)
          ?.forEach(poboacion => parroquia.addSubLevel(poboacion));
      }
    } while (!result.done);

    return adminDivisions;
  }
}

async function extractGeoInformation(shapefilePath, key) {
  const source = await openShapefile(shapefilePath);

  const geoInfo = new Map();

  let result;
  do {
    result = await source.read();
    if (!result.done) {
      const id = String(result.value.properties[key]);
      const geo = result.value.geometry;
      geoInfo.set(id, geo);
    }
  } while (!result.done);

  return geoInfo;
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
        alternativeNames,
        result.value.geometry);

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

module.exports = ShapefilesParser;
