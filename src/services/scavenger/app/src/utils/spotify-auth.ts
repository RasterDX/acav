const axios = require('axios');
const qs = require('querystring')

export class SpotifyUtils {
    static getAuth(clientId: string, clientSecret: string): Promise<any> {
        const body = {
            'grant_type': 'client_credentials'
        };
        const strBuffer = new Buffer(`${clientId}:${clientSecret}`);
        const base64 = strBuffer.toString('base64');
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${base64}`
            }
        }
        return axios.post('https://accounts.spotify.com/api/token', qs.stringify(body), config)
            .then((response: any) => {
                return response.data.access_token;
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    static search(endpoint: string, accessToken: string, q: string, type: string, market: string) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        return axios.get(endpoint + '?' + qs.stringify({q, type, market}), config)
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => {
                console.log(error.response);
            });
    }

    static getAnalysis(endpoint: string, accessToken: string, id: string) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        return axios.get(endpoint+id, config)
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => {
                console.log(error.response);
            });
    }
}