import mongoose = require('mongoose');
import { SearchQuery } from '../models/search-query.model';

mongoose.connect('mongodb://localhost:27017/mstats');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Established DB connection.')
});

export class Repository {
  searchResponse: mongoose.Schema;
  model: any;

  constructor() {
    this.searchResponse = new mongoose.Schema({
      searchQuery: mongoose.Schema.Types.Mixed,
      data: [{
        country: String,
        popularity: Number,
        peakDate: Date
      }]
    });

    this.model =  mongoose.model('SearchResponse', this.searchResponse);
  }

  async find(query: SearchQuery) {
    return this.model.find({searchQuery: query}, function(err:any, res:any) {
      if (err) {
        return "500_SERVER_ERROR";
      }
      if (!res.length) {
        return "404_NO_RECORD_FOUND";
      }
      else {
        return res;
      }
    });
  }
}
