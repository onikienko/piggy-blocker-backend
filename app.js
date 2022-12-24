const express = require('express');
const mongoose = require('mongoose');
const {HttpError} = require('./src/models/http-error');
const cors = require('cors');
const {getVideosRoutes} = require('./src/routes/getRoutes');
const {postVideosRoutes} = require('./src/routes/postRoutes');
const app = express();
require('dotenv').config();

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use(getVideosRoutes);
app.use(postVideosRoutes);

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