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

  res.send({
      id: province.id,
      name: province.name,
      comarcas: Array.from(province.subLevels.values())
        .map(comarca => ({
          id: comarca.id,
          name: comarca.name
        }))
    });
});

module.exports = router;
