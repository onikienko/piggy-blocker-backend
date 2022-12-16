const {RuVideo, NotRuVideo} = require('./models/video');
const {HttpError} = require('./models/http-error');
const getVideosFromDb = async (req, res, next, isRu) => {
    try {
        if (isRu) {
            const ruVideos = await RuVideo.find({}, '-_id -__v');
            res.status(200).json(ruVideos);
        } else {
            const notRuVideos = await NotRuVideo.find({}, '-_id -__v');
            res.status(200).send(notRuVideos);
        }
    } catch (e) {
        return next(new HttpError('error getting items from db', e.message));
    }
};
const addVideosToDb = async (req, res, next, isRu) => {
    if (!req.body?.videos?.[0]) return res.status(404).send('no videos data are in request');
    for (let video of req.body.videos) {
        console.log('!!!', video.title);
        try {
            isRu ? await RuVideo.create(video) : await NotRuVideo.create(video);
        } catch (e) {
            console.log(e);
            // return next(new HttpError('could not add to db(((((((', 404))
        }
    }
    res.status(200).send('videos successfully added to db');
};
module.exports = {getVideosFromDb, addVideosToDb};