const express = require('express');
const app = express();
const monitoring = require('./monitoring');
const levels = require('./divisions');

const PORT = 9000;

app.use('/', monitoring);
app.use('/', levels);

app.listen(PORT, () => {
  console.log(`NAG service listening on port ${PORT}`);
})
