var util = require('../utility');
var songproxy = require('../proxy/song');
var config = require('../../config');
var userproxy = require('../proxy/user');

exports.getUser = function(req, res, next) {
    var data = {};
    if (req.session.user) {
        var user = req.session.user;
        //var c_time = util.formatDate(user.createtime, true);
        data.user = {
            name: user.name,
            gender: user.gender,
            avatar: user.avatar,
            profile: user.profile,
            location: user.location,
            //createtime: c_time,
            level: user.level,
            score: user.score
        };
        return res.json({data: data});
    } else {
        data.user = {};
        console.log(data);
        return res.json({data: data});
    }
}


exports.getSongs = function(req, res, next) {
    var data = {};
    if (!req.session.user) {
        //just only 10 songs to try it for no login user
        var limit = config.songs_perpage;
        var options = {limit: limit};
        songproxy.getSongsByQuery({}, options, function(err, songs) {
            if (err) return next(err);
            var allsongs = [];
            for(var i = 0; i < songs.length; i++) {
                var song = {};
                song.src = songs[i].url;
                song.type = "audio/mpeg";
                allsongs.push(song);
            }
            data.songs = allsongs;
            console.log(data);
            return res.json({data: data});
        });
    } else {
        var page = parseInt(req.query.page, 10) || 1;
        var limit = config.songs_perpage;
        var options = {skip: (page -1)*limit, limit: limit};
        songproxy.getSongsByQuery({}, options, function(err, songs) {
           if (err) return next(err);
           var allsongs = [];
           for(var i = 0; i < songs.length; i++) {
               var song = {};
               song.src = songs[i].url;
               song.type = "audio/mpeg";
               allsongs.push(song);
           }
           data.songs = allsongs;
           return res.json({data: data});
        });
    }
}

