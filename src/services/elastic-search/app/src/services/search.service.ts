import { SearchQuery } from "../models/search-query.model";
export class SearchService {
  constructor() {}

  static search(input: any) {
    return new SearchQuery()
      .deserialize(input)
      .then(response => response)
      .catch(err => {throw err});
  }
}
