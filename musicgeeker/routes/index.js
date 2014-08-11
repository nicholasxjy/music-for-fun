var auth = require('../server/controllers/auth');

module.exports = function(app) {
    app.get('/', function(req, res) {
        return res.render('index');
    });
    app.post('/api/user/signup', auth.signup);
    app.post('/api/user/signin', auth.signin);
    app.post('/api/user/forgotpass', auth.forgotPass);
}
