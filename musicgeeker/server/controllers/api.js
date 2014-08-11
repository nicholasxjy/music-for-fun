var util = require('../utility');

exports.getHome = function(req, res, next) {
    var data = {};
    if (req.session.user) {
        var tempUser = req.session.user;
        var c_time = util.formatDate(tempUser.createtime, true);
        data.user = {
            name: tempUser.name,
            gender: tempUser.gender,
            avatar: tempUser.avatar,
            profile: tempUser.profile,
            location: tempUser.location,
            createtime: c_time,
            level: tempUser.level,
            score: tempUser.score
        };
        //todo get music contents here and return the data

    } else {
        data.user = {};
    }
    console.log(res.locals.c_user);
    return res.json({data: data});
}