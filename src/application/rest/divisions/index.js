const express = require('express');
const router = express.Router();
const {levelsIndex, levelsRepository} = require('../../../domain');
const {levelTypeToString, AdminLevel, LevelTypes} = require('../../../domain/admin-levels');

router.get('/comarcas', (req, res) => {
  const comarcas = levelsIndex.findAllComarcas();

  res.send(comarcas.map(comarca => mapLevelToDao(comarca)));
});

router.get('/comarcas/:comarca', (req, res) => {
  const comarca = levelsIndex.findComarcaById(req.params.comarca);

  res.send(mapLevelSubTreeToDao(comarca));
});

router.get('/divisions/:ineCode', (req, res) => {
  const level = levelsIndex.findByIneCode(req.params.ineCode);

  res.send(mapLevelSubTreeToDao(level));
});

router.get('/divisions/:ineCode/:division', (req, res) => {
  const level = levelsIndex.findByIneCode(req.params.ineCode);

  if (level.type === LevelTypes.Provincia && req.params.division === 'comarcas') {
    res.send(mapSubLevelsToDao(level));
  }

  res.send(mapSubLevelsToDao(level));
});

router.get('/provincias', (req, res) => {
  res.send(levelsRepository.findAll()
    .map(province => mapLevelToDao(province)));
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

function mapSubLevelsToDao(level) {
  return level.getSubLevelsAsArray()
    .map(subLevel => mapLevelToDao(subLevel));
}

module.exports = router;
