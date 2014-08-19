var util = require('../utility');
var songproxy = require('../proxy/song');
var config = require('../../config');
var userproxy = require('../proxy/user');
var songtouserproxy = require('../proxy/songtouser');

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
        data.user = {
            name: "你还没有登录",
            avatar: config.default_avatar_url,
            level: "",
            score: ""
        };
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
                song.id = songs[i]._id;
                song.src = songs[i].url;
                song.type = "audio/mpeg";
                allsongs.push(song);
            }
            data.songs = allsongs;
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
               song.id = songs[i]._id;
               song.src = songs[i].url;
               song.type = "audio/mpeg";
               allsongs.push(song);
           }
           data.songs = allsongs;
           return res.json({data: data});
        });
    }
};

exports.checkSong = function(req, res, next) {
    var audio = req.body.data;
    songproxy.getSongById(audio.id, function(err, song) {
        if (err) return next(err);
        if (!song) return res.json({status: 'fail', msg: "You've got the wrong song, dear!"});
        if (audio.name.toUpperCase() === song.name.toUpperCase()) {
            // add user to song relation , change user score
            if (req.session.user) {
                var userid = req.session.user._id;
                var songid = song._id;
                songtouserproxy.createNew(userid, songid, function(err) {
                    if (err) return next(err);
                    console.log(userid);
                    userproxy.getUserById(userid, function(err, user) {
                        if (err) return next(err);
                        console.log(user);
                        user.score += 10;
                        user.save(function(err) {
                            if (err) return next(err);
                            return res.json({status: 'success', msg: "Oh yeah, you've got the right song and +10 points. Carry on!", score: user.score});
                        });
                    });
                });
            } else {
                return res.json({status: 'success', msg: "Oh yeah, you've got the right song. Carry on!"});
            }
        } else {
            return res.json({status: 'fail', msg: "You've got the wrong song, dear!"});
        }
    });
}

