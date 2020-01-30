import { ApiFactory, ApiSources } from "../sources/data-sources";
import { SpotifyUtils } from "../utils/spotify-auth";

export class SpotifyService {
    static async search(req: any) {
        const spotify = ApiFactory(ApiSources.SPOTIFY);
        const data: any[] = [];
        let category = 'track';
        let term = '';
        if (req.body.song) {
            category = 'track';
            term = req.body.song;
        }
        else if (req.body.album) {
            category = 'album';
            term = req.body.album;
        }
        else if (req.body.artist) {
            category = 'artist';
            term = req.body.artist;
        }
        req.body.region.forEach((market: string) => {
            SpotifyUtils.getAuth(spotify.clientId, spotify.clientSecret).then(
                (accessToken) => {
                    SpotifyUtils.search(spotify.apiEndPoint, accessToken, term, category, market).then(
                        (response: any) => {
                            if (category == 'track') {
                                SpotifyUtils.getAnalysis('https://api.spotify.com/v1/audio-features/', accessToken, response.data['tracks'].items[0].id).then(
                                    (analysis:any) => {
                                        response.data['tracks'].items[0].analysis = analysis.data;
                                        response.data['tracks'].items[0].market = market;
                                        data.push(response.data[`${category}s`].items[0]);
                                        console.log(response.data[`${category}s`].items[0]);
                                    }
                                )
                            } else {
                                data.push(response.data[`${category}s`].items[0]);
                                console.log(response.data[`${category}s`].items[0]);
                            }
                        }
                    );
                }
            );
        });
        return data;
    }
}