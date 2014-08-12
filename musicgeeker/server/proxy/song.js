var Song = require('../models').Song;

exports.getSongsByQuery = function(query, options, callback) {
    Song.find(query, {}, options, callback);
};

exports.getSongById = function(id, callback) {
    Song.findById(id, callback);
}