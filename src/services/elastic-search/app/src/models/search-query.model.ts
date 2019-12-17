import { Deserializable } from "../interfaces/deserializable.interface";
import { SmartQueryParser } from "../services/smart-query-parser.service";

export class SearchQuery implements Deserializable {
  genre!: string;
  region!: string[];
  startPeriod!: Date;
  endPeriod!: Date;
  song!: string;
  artists!: string[];
  album!: string;
  artistCountry!: string;
  recordLabel!: string;
  producers!: string;
  writers!: string;

  constructor() {}

  public deserialize(input: any): Promise<SearchQuery> {
    this.genre = input.genre;
    this.region = input.region;
    this.startPeriod = input.startPeriod;
    this.endPeriod = input.endPeriod;
    this.song = input.song;
    this.artists = input.artists;
    this.album = input.album;
    this.artistCountry = input.artistCountry;
    this.recordLabel = input.recordLabel;
    this.producers = input.producers;
    this.writers = input.writers;
    return SmartQueryParser.validateQuery(this)
      .then((response: SearchQuery) => response)
      .catch(err => {throw err});
  }
}
