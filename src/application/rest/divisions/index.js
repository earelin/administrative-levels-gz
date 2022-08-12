const express = require('express');
const router = express.Router();
const {levelsIndex, levelsRepository} = require('../../../domain');
const {levelTypeToString} = require('../../../domain/admin-levels');

router.get('/provincias', (req, res) => {
  res.send(levelsRepository.findAll()
    .map(province => mapLevelToDao(province)));
});

router.get('/divisions/:ineCode', (req, res) => {
  const level = levelsIndex.findByIneCode(req.params.ineCode);

  res.send(mapLevelSubTreeToDao(level));
});

router.get('/comarcas/:comarca', (req, res) => {
  const comarca = levelsIndex.findComarcaById(req.params.comarca);

  res.send(mapLevelSubTreeToDao(comarca));
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
    ...mapLevelToDao(level),
    subLevels: Array.from(level.subLevels.values())
      .map(subLevel => mapLevelToDao(subLevel))
  }
}

module.exports = router;