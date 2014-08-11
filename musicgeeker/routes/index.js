var auth = require('../server/controllers/auth');
var api = require('../server/controllers/api');

module.exports = function(app) {
    app.get('/', function(req, res) {
        return res.render('index');
    });
    app.get('/api/home', api.getHome);
    app.post('/api/user/signup', auth.signup);
    app.post('/api/user/signin', auth.signin);
    app.post('/api/user/forgotpass', auth.forgotPass);
}
