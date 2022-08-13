const express = require('express');
const {levelsIndex, levelsRepository, divisionsService} = require('../../../domain');
const {levelTypeToString, AdminDivisionTypes} = require('../../../domain/admin-levels');

const router = express.Router();

const divisionToEnum = {
  comarcas: AdminDivisionTypes.Comarca,
  concellos: AdminDivisionTypes.Concello,
  parroquias: AdminDivisionTypes.Parroquia,
  poboacions: AdminDivisionTypes.Poboacion
}

router.get('/comarcas/:comarca', (req, res) => {
  const comarca = levelsIndex.findComarcaById(req.params.comarca);

  res.send(mapLevelSubTreeToDao(comarca));
});

router.get('/comarcas', (req, res) => {
  const comarcas = levelsIndex.findAllComarcas();

  res.send(comarcas.map(comarca => mapLevelToDao(comarca)));
});

router.get('/divisions/:ineCode/geometry', (req, res) => {
  const level = levelsIndex.findByIneCode(req.params.ineCode);

  res.send(adaptLevelToGeometryDao(level));
});

router.get('/divisions/:ineCode/:division', (req, res) => {
  const subDivisionType = divisionToEnum[req.params.division];
  const subDivisions = divisionsService.findSubdivisionsOf(req.params.ineCode, subDivisionType);

  res.send(mapLevelsToDao(subDivisions));
});

router.get('/divisions/:ineCode/:division/geometry', (req, res) => {
  const subDivisionType = divisionToEnum[req.params.division];
  const subDivisions = divisionsService.findSubdivisionsOf(req.params.ineCode, subDivisionType);

  res.send(adaptLevelsArrayToGeometryDao(subDivisions));
});

router.get('/divisions/:ineCode', (req, res) => {
  const level = levelsIndex.findByIneCode(req.params.ineCode);

  res.send(mapLevelSubTreeToDao(level));
});

router.get('/provincias', (req, res) => {
  res.send(mapLevelsToDao(levelsRepository.findAll()));
});

router.get('/provincias/geometry', (req, res) => {
  res.send(adaptLevelsArrayToGeometryDao(levelsRepository.findAll()));
});

function mapLevelToDao(level) {
  return {
    id: level.id,
    name: level.name,
    alternativeNames: Array.from(level.alternativeNames),
    type: levelTypeToString(level.type)
  }
}

function mapLevelSubTreeToDao(level) {
  return {
    ...mapLevelToDao(level)
  }
}

function mapLevelsToDao(levels) {
  return levels.map(level => mapLevelToDao(level));
}

function adaptLevelToGeometryDao(level) {
  return {
    type: 'Feature',
    geometry: level.geometry,
    properties: {
      id: level.id,
      name: level.name,
      alternativeNames: Array.from(level.alternativeNames),
      type: levelTypeToString(level.type)
    }
  };
}

function adaptLevelsArrayToGeometryDao(levels) {
  return {
    type: 'FeatureCollection',
    features: levels.map(level => adaptLevelToGeometryDao(level))
  };
}

module.exports = router;
