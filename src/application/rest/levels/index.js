const express = require('express');
const router = express.Router();
const {levelsIndex, levelsRepository} = require('../../../domain');
const {levelTypeToString} = require('../../../domain/admin-levels');

router.get('/', (req, res) => {
  res.send(levelsRepository.findAll()
    .map(province => mapLevelToDao(province)));
});

router.get('/:ineCode', (req, res) => {
  const level = levelsIndex.findByIneCode(req.params.ineCode);

  res.send(mapLevelSubTreeToDao(level));
});

router.get('/:province/:comarca', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);

  res.send(mapLevelSubTreeToDao(comarca));
});

function mapLevelToDao(level) {
  return {
    id: level.id,
    name: level.name,
    alternativeNames: Array.from(level.alternativeNames),
    type: levelTypeToString(level.type),
    geometry: level.geometry
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
