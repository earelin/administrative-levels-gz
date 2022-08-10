const express = require('express');
const router = express.Router();
const {levelsRepository} = require('../../../domain');

router.get('/', (req, res) => {
  res.send(levelsRepository.findAll());
});

module.exports = router;
