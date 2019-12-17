import { SearchService } from "../services/search.service";
import { ErrorFactory } from '../errors/error-factory';
import express = require("express");

const app = express();

export = app.get('/', (req, res) => {
  SearchService.search(req.query)
    .then(response => res.send(response))
    .catch(err => {
      const error = ErrorFactory.generateError(err.message);
      res.status(error.code).send(error);
    });
});
