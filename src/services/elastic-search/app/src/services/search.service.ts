import { SearchQuery } from "../models/search-query.model";
import { Repository } from "../repository/dbhook";
import { ErrorFactory } from "../errors/error-factory";

export class SearchService {

  static repository: Repository = new Repository();

  constructor() {}

  static async search(input: SearchQuery) {
    const result = await this.repository.find(input);
    if (ErrorFactory.ERROR_STRINGS.includes(result)) {
      return ErrorFactory.generateError(result);
    }
    if (!result.length) {
      return ErrorFactory.generateError('404_NO_RECORD_FOUND');
    }
    /*  If it gets to here, it means we should start the data scavenging  */
    return result;
  }

  static generateQuery(input: any) {
    return new SearchQuery()
      .deserialize(input)
      .then(response => response)
      .catch(err => {throw err});
  }
}
