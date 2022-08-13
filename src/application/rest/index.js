const express = require('express');
const monitoring = require('./monitoring/index');
const divisions = require('./divisions/index');

const PORT = 9000;

const app = express();

app.use('/', monitoring);
app.use('/', divisions);

app.listen(PORT, () => {
  console.log(`NAG service listening on port ${PORT}`);
})
