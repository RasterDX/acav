import { Deserializable } from "../interfaces/deserializable.interface";

export class SearchResponse implements Deserializable {
    data!: any[];
    features: any;

    constructor() {}

    public deserialize(input: any): SearchResponse {
        this.data = input.data;
        this.features = input.features;
        return this;
    }

}
