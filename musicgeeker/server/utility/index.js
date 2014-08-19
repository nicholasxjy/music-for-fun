var crypto = require('crypto');
var nodemailer = require('nodemailer');
var util = require('util');
var config = require('../../config');
var smtpTransport = nodemailer.createTransport('SMTP', config.mail_config);

exports.md5Crypto = function(str) {
    var md5Hash = crypto.createHash('md5');
    md5Hash.update(str);
    str = md5Hash.digest('hex');
    return str;
};

exports.encryt = function(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var encstr = cipher.update(str, 'utf8', 'hex');
    encstr += cipher.final('hex');
    return encstr;
};

exports.decryt = function(str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var destr = decipher.update(str, 'hex', 'utf8');
    destr += decipher.final('utf8');
    return destr;
};

exports.randomString = function(size) {
    size = size || 6;
    var allString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxLen = allString.length + 1;
    var random = '';
    while(size > 0) {
        random += allString.charAt(Math.floor(Math.random() * maxLen));
        size--;
    }
    return random;
}

exports.formatDate = function(date, friendly) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    if (friendly) {
        var now = new Date();
        var msseconds = -(date.getTime() - now.getTime());
        var timeStamp = [1000, 1000*60, 1000*60*60, 1000*60*60*24];
        if (msseconds < timeStamp[3]) {
            if (msseconds > 0 && msseconds < timeStamp[1]) {
                return Math.floor(msseconds/timeStamp[0]) + ' 秒前';
            }
            if (msseconds > timeStamp[1] && msseconds < timeStamp[2]) {
                return Math.floor(msseconds/timeStamp[1]) + ' 分钟前';
            }
            if (msseconds > timeStamp[2] && msseconds < timeStamp[3]) {
                return Math.floor(msseconds/timeStamp[2]) + ' 小时前';
            }
        }
        var thisyear = new Date().getFullYear();
        var year = (thisyear === year) ? '' : year;
        if (year !== '') {
            return year + ' 年 ' + (month+1) + ' 月 ' + (day+1) + ' 日 ' + hour + ':' + minutes;
        } else {
            return (month+1) + ' 月 ' + (day+1) + ' 日 ' + hour + ':' + minutes;
        }

    }
}

exports.sendActiveMail = function(useremail, token, name) {
    var from = util.format('%s <%s>', config.sitename, config.mail_config.auth.user);
    var to = useremail;
    var subject = config.sitename + ' 帐号激活。';
    var content = "<p>您好，</p>" + "<p>感谢注册 " + config.sitename + ", 请点击下面链接以激活账户</p>" +
        "<a href='" + config.host +"/api/user/active?key="+ token + "&name="+ name +"'>激活链接</a>"
        +"<p>再次欢迎您的到来，Having fun here!</p>";

    smtpTransport.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: content
    }, function(err, res) {
        if (err) console.log('Send Email error: ' + err.message);
    });
};

exports.sendResetPassMail = function(useremail, key, name) {
    var from = util.format('%s <%s>', config.sitename, config.mail_config.auth.user);
    var to = useremail;
    var subject = config.sitename + ' 重置密码。';
    var content = "<p>您好，</p>" + "<p>请在24小时内点击下面的链接，来重置您的密码。</p>" +
        "<a href='" + config.host +"/reset-pass?key="+ key +"&name="+ name +"'>重置密码链接</a>";
    smtpTransport.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: content
    }, function(err, res) {
        if (err) console.log('Send Reset Pass Email error: ' + err.message);
    });
}

