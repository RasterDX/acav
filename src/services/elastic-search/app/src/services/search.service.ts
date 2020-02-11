import { SearchQuery } from "../models/search-query.model";
import { Repository } from "../repository/dbhook";
import { SearchResponse } from "../models/search-result.model";
import { PostProcess } from "../utils/post-process";
const axios = require('axios');

export class SearchService {

  static repository: Repository = new Repository();

  constructor() {}

  static async search(input: SearchQuery) {


    /*  If it gets to here, it means we should start the data scavenging  */
    return  axios.post('http://localhost:3010', input).then(
      (response: any) => {
        this.repository.save(response.data.data);
        response.data.data = PostProcess.adjustPopularityPerCountry(response.data.data);
        const youthPreference = PostProcess.getYouthPreference(response.data.features);
        const seniorPreference = PostProcess.getSeniorPreference(response.data.features);
        response.data.youthPreference = youthPreference;
        response.data.seniorPreference = seniorPreference;
        return response;
      }
    );
  }

  static generateQuery(input: any) {
    return new SearchQuery()
      .deserialize(input)
      .then(response => response)
      .catch(err => {throw err});
  }
}
