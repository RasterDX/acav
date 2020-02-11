import express = require('express');
import { SpotifyService } from '../services/spotify.service';

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export = app.post('/', (req, res) => {
    SpotifyService.search(req).then(
        (response: any) => {
            console.log(response);
            res.set(200).send(response);
        }
    ).catch((error:any) => {res.status(400).send(error);})
});