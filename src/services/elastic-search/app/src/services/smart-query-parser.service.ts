import { SearchQuery } from "../models/search-query.model";

export class SmartQueryParser {
  static validateQuery(searchQuery: SearchQuery): Promise<SearchQuery> {
    return new Promise<SearchQuery>((resolve, reject) => {
      if (
        (searchQuery.artists && (searchQuery.song || searchQuery.album)) ||
        (searchQuery.genre && searchQuery.region)
      ) {
        resolve(searchQuery);
      } else {
        throw new Error("400_NO_MANDATORY_FIELDS");
      }
    });
  }
}
