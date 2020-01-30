import { SearchQuery } from "../models/search-query.model";
import { Repository } from "../repository/dbhook";
const axios = require('axios');

export class SearchService {

  static repository: Repository = new Repository();

  constructor() {}

  static async search(input: SearchQuery) {
    let result = await this.repository.find(input);

    /*  If it gets to here, it means we should start the data scavenging  */
    let searchResult = await axios.post('http://localhost:3010', input).then(
      (response: any) => {
        return response;
      }
    ).catch(
    )
    return await searchResult;
  }

  static generateQuery(input: any) {
    return new SearchQuery()
      .deserialize(input)
      .then(response => response)
      .catch(err => {throw err});
  }
}
