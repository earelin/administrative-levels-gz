const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send([{
    id: '15',
    name: 'A Coruña',
    subLevels: [{
      id: '2',
      name: 'A Coruña',
      subLevels: [],
    }, {
      id: '15',
      name: 'Santiago',
      subLevels: []
    }]
  }, {
    id: '27',
    name: 'Lugo',
    subLevels: [{
      id: '19',
      name: 'A Fonsagrada',
      subLevels: []
    }]
  }])
});

module.exports = router;
