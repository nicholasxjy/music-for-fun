var path = require('path');
var pkg = require('./package.json');

var config = {
    author: 'nicholas',
    sitename: 'Music Geekers',
    description: 'A big wonderful party for musci geekers!',
    vesion: pkg.version,

    dbname: 'musicgeeker',
    dburl: 'mongodb://127.0.0.1/mgeek',
    session_secret: 'mgeek',
    cookie_secret: 'mgeek',
    cookieName: 'mgeek',
    cookieAge: 1000*60*60*24*30,
    avatar_dir: path.join(__dirname, 'public', 'avatars'),
    default_avatar_url: '/images/avatar.png',
    none_profile: '你还没有向大家介绍你自己呢！',
    mail_config: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'lolme_club@126.com',
            pass: 'hilarious4862'
        }
    }
};

module.exports = config;