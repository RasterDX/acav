import express = require('express');

const app: express.Application = express();
const port = 3010;

app.listen(port, function () {
  console.log(`Scavenger Service listening on ${port}`);
});