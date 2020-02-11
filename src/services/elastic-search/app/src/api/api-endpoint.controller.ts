import { SearchService } from "../services/search.service";
import { ErrorFactory } from '../errors/error-factory';
import express = require("express");

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

export = app.post('/', (req, res) => {
  SearchService.generateQuery(req.body).then(async (result) => {
    SearchService.search(result).then(
      (response: any) => {
        res.status(200).send({searchQuery: req.body, ...response.data});
      }
    );
  }).catch((err) => {
    const error = ErrorFactory.generateError(err.message);
    res.status(error.code).send(error);
  });
});
