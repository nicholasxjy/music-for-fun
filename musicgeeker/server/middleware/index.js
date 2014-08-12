var util = require('../utility');
var config = require('../../config');
var userproxy = require('../proxy/user');

exports.authUser = function(req, res, next) {
    var sess = req.session;
    if (sess && sess.user) {
        userproxy.getUserById(req.session.user._id, function(err, user) {
            if (err) return next(err);
            if (user) {
                user.format_create_time = util.formatDate(user.createtime, true);
                sess.user = user;
                //res.locals.c_user = user;
                return next();
            } else {
                return next();
            }
        });
    } else {
        var authcookie = req.cookies[config.cookieName];
        if (!authcookie) {
            return next();
        }
        var cookieToken = util.decryt(authcookie, config.session_secret);
        var userid = cookieToken.split('||')[0];
        userproxy.getUserById(userid, function(err, user) {
            if (err) return next(err);
            if (user) {
                user.format_create_time = util.formatDate(user.createtime, true);
                sess.user = user;
                //res.locals.c_user = user;
                return next();
            } else {
                return next();
            }
        });
    }
};