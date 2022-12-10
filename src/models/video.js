const {Schema, model} = require('mongoose');

const VideoSchema = new Schema({
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

const RuVideoSchema = new Schema(VideoSchema);
const NotRuVideoSchema = new Schema(VideoSchema);

const RuVideo = model('RuVideo', RuVideoSchema);
const NotRuVideo = model('NotRuVideo', NotRuVideoSchema);
module.exports = {RuVideo, NotRuVideo};
