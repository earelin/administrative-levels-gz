const express = require('express');
const app = express();
const monitoring = require('./application/monitoring');

const PORT = 9000;

app.use('/', monitoring);

app.listen(PORT, () => {
  console.log(`NAG service listening on port ${PORT}`);
})
