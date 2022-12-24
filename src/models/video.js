const {Schema, model} = require('mongoose');

const VideoSchema = new Schema({
    isRu: {
        required: true,
        type: Number,
    },
    uid: {
        required: true,
        type: String,
    },
    channelName: {
        required: false,
        type: String,
        default: null,
    },
    link: {
        required: true,
        type: String,
    },
    reason: {
        required: true,
        type: String,
    },
    reasonDetails: {
        required: false,
        type: String,
        default: null,
    },
    timeWhenBlocked: {
        required: true,
        type: Number,
    },
    title: {
        required: true,
        type: String,
    },
});

const Video = model('NotRuVideo', VideoSchema);
module.exports = {Video};
