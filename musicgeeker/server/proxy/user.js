var User = require('../models').User;

exports.getUsersByQuery = function(query, option, callback) {
    User.find(query, {}, option, callback);
}

exports.getUserByName = function(name, callback) {
    User.findOne({name: name}, callback);
}

exports.getUserByEmail = function(email, callback) {
    User.findOne({email: email}, callback);
}

exports.getUserById = function(id, callback) {
    User.findOne({_id: id}, callback);
}

exports.createNewUser = function(name, email, pass, callback) {
    var user = new User;
    user.name = name;
    user.email = email;
    user.password = pass;
    user.save(callback);
}