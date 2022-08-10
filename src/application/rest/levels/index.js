const express = require('express');
const router = express.Router();
const {levelsRepository} = require('../../../domain');

router.get('/', (req, res) => {
  res.send(levelsRepository.findAll()
    .map(province => ({
      id: province.id,
      name: province.name
    })));
});

router.get('/:province', (req, res) => {
  const province = levelsRepository.findById(req.params.province);

  res.send(mapLevelToDao(province, 'comarcas'));
});

router.get('/:province/:comarca', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);

  res.send(mapLevelToDao(comarca, 'concellos'));
});

router.get('/:province/:comarca/:concello', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);
  const concello = comarca.findSubLevelById(req.params.concello);

  res.send(mapLevelToDao(concello, 'parroquias'));
});

function mapLevelToDao(level, subdivision) {
  return {
    id: level.id,
    name: level.name,
    [subdivision]: Array.from(level.subLevels.values())
    .map(subLevel => ({
      id: subLevel.id,
      name: subLevel.name
    }))
  }
}

module.exports = router;
