import express from 'express';
import monitoring from './monitoring/index.js';
import divisions from './divisions/index.js';

const PORT = 9000;

const app = express();

app.use('/', monitoring);
app.use('/', divisions);

app.listen(PORT, () => {
  console.log(`NAG service listening on port ${PORT}`);
})
