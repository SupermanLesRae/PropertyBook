var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserEntriesSchema = new Schema({
    username:String,
    email:String,
    password:String
});

module.exports = mongoose.model('users', UserEntriesSchema);