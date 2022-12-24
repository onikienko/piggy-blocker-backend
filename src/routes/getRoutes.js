const express = require('express');
const {getVideosFromDb} = require('../controllers');
const router = express.Router();

router.get('/videos', getVideosFromDb);

module.exports = {getVideosRoutes: router};