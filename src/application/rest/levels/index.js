const express = require('express');
const router = express.Router();
const {levelsRepository} = require('../../../domain');
const {levelTypeToString} = require('../../../domain/admin-levels');

router.get('/', (req, res) => {
  res.send(levelsRepository.findAll()
    .map(province => mapLevelToDao(province)));
});

router.get('/:province', (req, res) => {
  const province = levelsRepository.findById(req.params.province);

  res.send(mapLevelSubTreeToDao(province, 'comarcas'));
});

router.get('/:province/:comarca', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);

  res.send(mapLevelSubTreeToDao(comarca, 'concellos'));
});

router.get('/:province/:comarca/:concello', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);
  const concello = comarca.findSubLevelById(req.params.concello);

  res.send(mapLevelSubTreeToDao(concello, 'parroquias'));
});

router.get('/:province/:comarca/:concello/:parroquia', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);
  const concello = comarca.findSubLevelById(req.params.concello);
  const parroquia = concello.findSubLevelById(req.params.parroquia);

  res.send(mapLevelSubTreeToDao(parroquia, 'poboacions'));
});

router.get('/:province/:comarca/:concello/:parroquia/:poboacion', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);
  const concello = comarca.findSubLevelById(req.params.concello);
  const parroquia = concello.findSubLevelById(req.params.parroquia);
  const poboacion = parroquia.findSubLevelById(req.params.poboacion);

  res.send(mapLevelToDao(poboacion));
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
