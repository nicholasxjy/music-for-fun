var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SongtoUserSchema = new Schema({
    userid: {type: ObjectId},
    songid: {type: ObjectId},
    createtime: {type: Date, default: Date.now}
});

mongoose.model('SongtoUser', SongtoUserSchema);