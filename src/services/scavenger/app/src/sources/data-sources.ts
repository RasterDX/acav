import { ApiDefinition } from "../interfaces/api-definition.interface";

export enum ApiSources {
    SPOTIFY,
    YOUTUBE
}

export class Api implements ApiDefinition {
    apiEndPoint: string;
    requiredParams: string[];
    responseParams: string[];
    clientId: string;
    clientSecret: string;

    constructor(apiEndPoint: string, requiredParams: string[], responseParams: string[],
                clientId: string, apiKey: string) {
        this.apiEndPoint = apiEndPoint;
        this.requiredParams = requiredParams;
        this.responseParams = responseParams;
        this.clientId = clientId;
        this.clientSecret = apiKey;
    }
}

export function ApiFactory(source: ApiSources) {
    switch (source) {
        case ApiSources.SPOTIFY:
            return new Api('https://api.spotify.com/v1/search', ['q', 'type'], ['popularity'], '73df5628e2f14432becbf4918aac7723', '1dca904a7c154b87ad2233727dd0e8db');
        default:
            return new Api('https://api.spotify.com/v1/search', ['q', 'type'], ['popularity'], '73df5628e2f14432becbf4918aac7723', '1dca904a7c154b87ad2233727dd0e8db');
    }

}
