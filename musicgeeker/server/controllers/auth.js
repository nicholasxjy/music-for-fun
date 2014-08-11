var validator = require('validator');
var userproxy = require('../proxy/user');
var util = require('../utility');
var config = require('../../config');

exports.signup = function(req, res, next) {
    var info = req.body.data;
    var name = info.name;
    var email = info.email;
    var pass = info.pass;
    name = validator.trim(name);
    email = validator.trim(email);

    if (!validator.isAlphanumeric(name)) {
        return res.json({status: 'fail', msg: '用户名只允许字母和数字'});
    }
    if (!validator.isEmail(email)) {
        return res.json({status: 'fail', msg: '请填写正确的邮箱地址'});
    }
    //check username or email has been registered
    userproxy.getUsersByQuery({'$or': [{'name': name}, {'email': email}]}, {}, function(err, users) {
        if (err) return next(err);
        if (users && users.length > 0) {
            return res.json({status: 'fail', msg: '用户名或邮箱已被占用'});
        }
        pass = util.md5Crypto(pass);
        userproxy.createNewUser(name, email, pass, function(err) {
            if (err) return next(err);
            var token = util.md5Crypto(email + config.session_secret);
            //send active email
            util.sendActiveMail(email, token, name);
            return res.json({status: 'success', msg: '欢迎来到 ' + config.sitename +
            '我们给你的注册邮箱发送了一份激活邮件，请点击其中连接以激活您的帐号。'});
        });
    });

};

exports.signin = function(req, res, next) {
    var info = req.body.data;
    var name = info.name;
    var pass = info.pass;
    var activeTip = "";
    userproxy.getUserByName(name, function(err, user) {
        if (err) return next(err);
        if (!user) return res.json({status: 'fail', msg: '该用户不存在!'});
        pass = util.md5Crypto(pass);
        if (pass != user.password) {
            return res.json({status: 'fail', msg: '密码不正确'});
        }
        if (!user.active) {
            var token = util.md5Crypto(user.email + config.session_secret);
            util.sendActiveMail(user.email, token, user.name);
            activeTip = "此帐号还没有激活，激活链接已发送到您的邮箱 "
                + user.email + " 请及时查收";
        }
        //设置cookie
        var cookieToken = util.encryt(user._id + '||' + user.name + '||'
            + user.email + '||' + user.password, config.session_secret);
        res.cookie(config.cookieName, cookieToken, {path: '/', maxAge: config.cookieAge});
        return res.json({status: 'success', activetip: activeTip});
    });
};

exports.forgotPass = function(req, res, next) {
    var info = req.body.data;
    var email = info.email;
    email = validator.trim(email);
    if (!validator.isEmail(email)) {
        return res.json({status: 'fail', msg: '邮箱地址不正确'});
    }
    userproxy.getUserByEmail(email, function(err, user) {
        if (err) return next(err);
        if (!user) {
            return res.json({status: 'fail', msg: '不存在此邮箱用户'});
        }
        var forgetKey = util.randomString(15);
        user.forgetkey = forgetKey;
        user.save(function(err) {
            if (err) return next(err);
            util.sendResetPassMail(email, forgetKey, user.name);
            return res.json({status: 'success', msg: '我们给你的邮箱发送一封重置密码的邮件，请点击里面的连接以重置密码。'});
        });
    });
};