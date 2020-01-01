export class DataSource {

    apiEndPoint: string;
    requiredParams: string[];
    responseParams: string[];

    constructor(apiEndPoint: string, requiredParams: string[], responseParams: string[]) {
        this.apiEndPoint = apiEndPoint;
        this.requiredParams = requiredParams;
        this.responseParams = responseParams;
    }
}
