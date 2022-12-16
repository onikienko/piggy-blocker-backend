const express = require('express');
const mongoose = require('mongoose');
const {HttpError} = require('./src/models/http-error');
const cors = require('cors');
const {addVideosToDb, getVideosFromDb} = require('./src/controllers');
const app = express();
require('dotenv').config();

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.post('/addruvideos', (req, res, next) => addVideosToDb(req, res, next, true));
app.post('/addnotruvideos', (req, res, next) => addVideosToDb(req, res, next, false));
app.get('/getruvideos', (req, res, next) => getVideosFromDb(req, res, next, true));
app.get('/getnotruvideos', (req, res, next) => getVideosFromDb(req, res, next, false));

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