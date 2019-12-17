import express = require('express');
import apiEndpointController = require('./src/api/api-endpoint.controller');

const app: express.Application = express();
const port = 3005;

app.use(apiEndpointController);

app.listen(port, function () {
  console.log(`Search Service listening on ${port}`);
});