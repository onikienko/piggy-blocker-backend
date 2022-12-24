const express = require('express');
const router = express.Router();
const {addVideosToDb} = require('../controllers');

router.post('/videos', addVideosToDb);

module.exports = {postVideosRoutes: router};