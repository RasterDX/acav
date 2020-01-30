import { SearchService } from "../services/search.service";
import { ErrorFactory } from '../errors/error-factory';
import express = require("express");

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export = app.post('/', (req, res) => {
  SearchService.generateQuery(req.body).then(async (result) => {
    let searchResult = await SearchService.search(result);
    res.status(200).send(searchResult);
  }).catch((err) => {
    const error = ErrorFactory.generateError(err.message);
    res.status(error.code).send(error);
  });
});
