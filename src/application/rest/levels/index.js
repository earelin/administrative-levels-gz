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

router.get('/:province/:comarca/:concello/:parroquia', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);
  const concello = comarca.findSubLevelById(req.params.concello);
  const parroquia = concello.findSubLevelById(req.params.parroquia);

  res.send(mapLevelToDao(parroquia, 'poboacions'));
});

router.get('/:province/:comarca/:concello/:parroquia/:poboacion', (req, res) => {
  const province = levelsRepository.findById(req.params.province);
  const comarca = province.findSubLevelById(req.params.comarca);
  const concello = comarca.findSubLevelById(req.params.concello);
  const parroquia = concello.findSubLevelById(req.params.parroquia);
  const poboacion = parroquia.findSubLevelById(req.params.poboacion);

  res.send({
    id: poboacion.id,
    name: poboacion.name
  });
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
