const express = require('express');
const mongoose = require('mongoose');
const {RuVideo, NotRuVideo} = require('./src/models/video');
const {HttpError} = require('./src/models/http-error');
const app = express();
require('dotenv').config();

app.use(express.json());
const addVideosToDb = async (req, res, next, isRu) => {
    if (!req.body?.videos[0]) return res.status(404).send('no videos data are in request');
    for (let video of req.body.videos) {
        try {
            isRu ? await RuVideo.create(video) : await NotRuVideo.create(video);
        } catch (e) {
            console.log(e);
            // return next(new HttpError('could not add to db(((((((', 404))
        }
    }
    res.status(200).send('videos successfully added to db');
};
app.post('/addruvideos', (req, res, next) => addVideosToDb(req, res, next, true));
app.post('/addnotruvideos', (req, res, next) => addVideosToDb(req, res, next, false));

app.use((req, res) => {
    throw new HttpError('Route not found', 404);
});

app.use((err, req, res, next) => {
    res.status(err.code || 500);
    return res.json({messagee: err.message || UNKNOWN_ERROR_MSG});
});

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    autoIndex: true,
})
    .then(() => {
        console.log('connected to db');
        app.listen(5000, () => {
            console.log('Server is listening on port 5000');
        });
    })
    .catch(e => {
        console.log(e);
    });