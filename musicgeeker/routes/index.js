var auth = require('../server/controllers/auth');
var api = require('../server/controllers/api');

module.exports = function(app) {
    app.get('/', function(req, res) {
        return res.render('index');
    });
    app.get('/api/getuser', api.getUser);
    app.get('/api/getsongs', api.getSongs);
    app.post('/api/checksong', api.checkSong);
    app.post('/api/user/signup', auth.signup);
    app.post('/api/user/signin', auth.signin);
    app.get('/api/user/active', auth.activeAccount);
    app.post('/api/user/forgotpass', auth.forgotPass);
    app.get('/api/user/logout', auth.logout);
}
