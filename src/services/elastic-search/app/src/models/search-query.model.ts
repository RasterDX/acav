import { Deserializable } from "../interfaces/deserializable.interface";
import { SmartQueryParser } from "../services/smart-query-parser.service";

export class SearchQuery implements Deserializable {
  genre!: string;
  region!: string[];
  startPeriod!: Date;
  endPeriod!: Date;
  song!: string;
  artist!: string;
  album!: string;
  artistCountry!: string;

  constructor() {}

  public deserialize(input: any): Promise<SearchQuery> {
    this.genre = input.genre || null;
    this.region = input.region || null;
    this.startPeriod = input.startPeriod || null;
    this.endPeriod = input.endPeriod || null;
    this.song = input.song || null;
    this.artist = input.artist || null;
    this.album = input.album || null;
    this.artistCountry = input.artistCountry || null;
    return SmartQueryParser.validateQuery(this)
      .then((response: SearchQuery) => response)
      .catch(err => {throw err});
  }

  public serialize(): any {
    return {
      genre: this.genre,
      region: this.region,
      startPeriod: this.startPeriod,
      endPeriod: this.endPeriod,
      song: this.song,
      artist: this.artist,
      album: this.album,
      artistCountry: this.artistCountry
    };
  }
}
