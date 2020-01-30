import { SearchQuery } from "../models/search-query.model";

export class SmartQueryParser {
  static validateQuery(searchQuery: SearchQuery): Promise<SearchQuery> {
    return new Promise<SearchQuery>((resolve, reject) => {
      if (
        (searchQuery.artist && searchQuery.region) ||
        (searchQuery.song && searchQuery.region) ||
        (searchQuery.album && searchQuery.region) ||
        (searchQuery.genre && searchQuery.region)
      ) {
        resolve(searchQuery);
      } else {
        throw new Error("400_NO_MANDATORY_FIELDS");
      }
    });
  }
}
