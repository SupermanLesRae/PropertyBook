var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserEntriesSchema = new Schema({
    email:String,
    username:String,
    password:String
});

module.exports = mongoose.model('users', UserEntriesSchema);