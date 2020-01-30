import express = require('express');
import restController = require('./src/api/rest.controller');

const app: express.Application = express();
const port = 3010;

app.use(restController);

app.listen(port, function () {
  console.log(`Scavenger Service listening on ${port}`);
});
