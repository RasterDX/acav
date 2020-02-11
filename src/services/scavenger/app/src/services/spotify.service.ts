import { ApiFactory, ApiSources } from "../sources/data-sources";
import { SpotifyUtils } from "../utils/spotify-auth";

export class SpotifyService {
    static async search(req: any) {
        const spotify = ApiFactory(ApiSources.SPOTIFY);
        const data: any[] = [];
        let features: any = {};
        let category = 'track';
        let term = '';
        ({ category, term } = SpotifyService.setCategory(req, category, term));
        SpotifyService.initializeRegions(req, data);
        return SpotifyUtils.getAuth(spotify.clientId, spotify.clientSecret).then(
            (accessToken) => {
                return SpotifyUtils.search(spotify.apiEndPoint, accessToken, term, category, 'US').then(
                    (response: any) => {
                        const topResult = response.data.tracks.items[0];
                        data.forEach((market) => {
                            market.popularity = topResult.popularity
                        });
                        features.artist = topResult.artists[0].name;
                        features.album = topResult.album.name;
                        features.artwork = topResult.album.images[0];

                        if (category == 'track') {
                            return SpotifyUtils.getAnalysis('https://api.spotify.com/v1/audio-features/', accessToken, response.data['tracks'].items[0].id).then(
                                (analysis: any) => {
                                    response.data['tracks'].items[0].analysis = analysis.data;

                                    features.instrumentalness = analysis.data.instrumentalness;
                                    features.danceability = analysis.data.danceability;
                                    features.acousticness = analysis.data.acousticness;
                                    features.name = topResult.name;

                                    return SpotifyUtils.getArtist(accessToken, topResult.artists[0].id).then(
                                        (artist: any) => {
                                            features.genres = artist.data.genres;
                                            return SpotifyUtils.getAlbum(accessToken, topResult.album.id).then(
                                                (album: any) => {
                                                    features.similarTracks = album.data.tracks;
                                                    return { data, features };
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    }
                );
            }
        );
    }

    private static initializeRegions(req: any, data: any[]) {
        req.body.region.forEach((market: string) => {
            data.push({
                country: market,
                popularity: 0
            });
        });
    }

    private static setCategory(req: any, category: string, term: string) {
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
        return { category, term };
    }

    static getArtist(access: string, id: string) {
        const spotify = ApiFactory(ApiSources.SPOTIFY);
        return SpotifyUtils.getArtist(access, id).then(
            (response: any) => response
        );
    }
}