var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config');

var SongSchema = new Schema({
    name: {type: String, index: true},
    url: {type: String},
    singer: {type: String},
    singeravatar: {type: String},
    coverurl: {type: String},
    realurl: {type: String},
    category: {type: String},
    introduction: {type: String, default: config.song_default_intro},
    createtime: {type: Date, default: Date.now}
});

mongoose.model('Song', SongSchema);