var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(config.dburl, function(err) {
    if (err) {
        console.log("connect db err: " + err.message);
        process.exit(1);
    }
    console.log("connect to db is just fine!");
});

require('./User');
require('./Song');
require('./SongtoUser');
exports.User = mongoose.model('User');
exports.Song = mongoose.model('Song');
exports.SongtoUser = mongoose.model('SongtoUser');