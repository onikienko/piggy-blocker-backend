const express = require('express');
const router = express.Router();
const {addVideosToDb, removeAllVideosFromDb} = require('../controllers');

router.post('/videos', addVideosToDb);
router.delete('/videos', removeAllVideosFromDb);

module.exports = {postVideosRoutes: router};