const marketRelevance = require('./music-markets').marketRelevance

export class PostProcess {

    static adjustPopularityPerCountry(data: any[]) {
        data.forEach((dataPair: any) => {
            dataPair.popularity = dataPair.popularity * 
                        ((marketRelevance[dataPair.country] ? marketRelevance[dataPair.country] : 0.1));
        });
        return data;
    }

    static getYouthPreference(features: any) {
        return (features.instrumentalness * 0.4) + (features.acousticness * 0.2) + (features.danceability * 0.9) +
                (PostProcess.countGenres('pop', features.genres) / 10) + (PostProcess.countGenres('electro', features.genres) / 10);
    }

    static getSeniorPreference(features: any) {
        return (features.instrumentalness * 0.5) + (features.acousticness * 0.8) + (features.danceability * 0.1) +
                (PostProcess.countGenres('rock', features.genres) / 10) + (PostProcess.countGenres('classical', features.genres) / 10);
    }

    static countGenres(genre: string, listOfGenres: string[]) {
        let count = 0;
        listOfGenres.forEach((element) => {
            if (element.toLowerCase().includes(genre.toLowerCase())) {
                count += 1;
            }
        });
        return count;
    }

    static normalize(min: number, max: number) {
        var delta = max - min;
        return function (val: number) {
            return (val - min) / delta;
        };
    }
    
}
