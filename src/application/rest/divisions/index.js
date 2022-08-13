const express = require('express');
const {levelsIndex, levelsRepository, divisionsService} = require('../../../domain');
const {levelTypeToString, LevelTypes} = require('../../../domain/admin-levels');

const router = express.Router();

const divisionToEnum = {
  comarcas: LevelTypes.Comarca,
  concellos: LevelTypes.Concello,
  parroquias: LevelTypes.Parroquia,
  poboacions: LevelTypes.Poboacion
}

router.get('/comarcas/:comarca', (req, res) => {
  const comarca = levelsIndex.findComarcaById(req.params.comarca);

  res.send(mapLevelSubTreeToDao(comarca));
});

router.get('/comarcas', (req, res) => {
  const comarcas = levelsIndex.findAllComarcas();

  res.send(comarcas.map(comarca => mapLevelToDao(comarca)));
});

router.get('/divisions/:ineCode/:division', (req, res) => {
  const subDivisionType = divisionToEnum[req.params.division];
  const subDivisions = divisionsService.findSubdivisionsOf(req.params.ineCode, subDivisionType);

  res.send(mapLevelsToDao(subDivisions));
});

router.get('/divisions/:ineCode', (req, res) => {
  const level = levelsIndex.findByIneCode(req.params.ineCode);

  res.send(mapLevelSubTreeToDao(level));
});

router.get('/provincias', (req, res) => {
  res.send(mapLevelsToDao(levelsRepository.findAll()));
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

module.exports = router;
