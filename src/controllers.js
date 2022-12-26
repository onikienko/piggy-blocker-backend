const {RuVideo, NotRuVideo, Video} = require('./models/video');
const {HttpError} = require('./models/http-error');
const getVideosFromDb = async (req, res, next) => {
    let page = req?.query?.page;
    let limit = req?.query?.limit;
    // console.log(page, limit);
    let videos;
    try {
        if (page && limit) {
            videos = await Video.find({}, '-_id -__v').skip(page * limit).limit(limit);
        } else {
            videos = await Video.find({}, '-_id -__v');
        }
        res.status(200).json(videos);
    } catch (e) {
        return next(new HttpError('error getting items from db', e.message));
    }
};
const removeAllVideosFromDb = async (req, res, next) => {
    try {
        await Video.deleteMany({});
        res.status(200).send('Db successfully cleared');
    } catch (e) {
        return next(new HttpError('could not remove videos from db', e), 500);
    }
};
const addVideosToDb = async (req, res, next) => {
    if (!req.body?.videos?.[0]) return res.status(404).send('no videos data are in request');
    for (let video of req.body.videos) {
        // console.log('!!!', video.title);
        try {
            await Video.create(video);
        } catch (e) {
            return next(new HttpError('error adding items to db', e.message));
            // return next(new HttpError('could not add to db(((((((', 404))
        }
    }
    res.status(200).send('videos successfully added to db');
};
module.exports = {getVideosFromDb, addVideosToDb, removeAllVideosFromDb};