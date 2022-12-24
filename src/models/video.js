const {Schema, model} = require('mongoose');

const VideoSchema = new Schema({
    isRu: {
        type: Number,
    },
    uid: {
        type: String,
    },
    channelName: {
        type: String,
        default: null,
    },
    link: {
        type: String,
    },
    reason: {
        type: String,
    },
    reasonDetails: {
        type: String,
        default: null,
    },
    timeWhenBlocked: {
        type: Number,
    },
    title: {
        type: String,
    },
});

const Video = model('NotRuVideo', VideoSchema);
module.exports = {Video};
