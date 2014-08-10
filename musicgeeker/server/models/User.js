var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config');

var UserSchema = new Schema({
    name: {type: String, index: true},
    email: {type: String, unique: true},
    password: {type: String},
    gender: {type: Number, default: 0},
    avatar: {type: String, default: config.default_avatar_url},
    location: {type: Number, default: 0},
    profile: {type: String, default: config.none_profile},
    createtime: {type: Date, default: Date.now},
    forgetkey: {type: String},
    level: {type: String, default: "新手"},
    score: {type: Number, default: 0},
    active: {type: Boolean, default: false}
});

mongoose.model('User', UserSchema);