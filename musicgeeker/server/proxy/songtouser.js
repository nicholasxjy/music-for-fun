var SongtoUser = require('../models').SongtoUser;

exports.createNew = function(userid, songid, callback) {
    var stu = new SongtoUser;
    stu.userid = userid;
    stu.songid = songid;
    stu.save(callback);
}