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

module.exports = router;
