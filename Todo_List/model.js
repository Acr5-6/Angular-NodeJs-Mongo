var mongoose = require('mongoose');

var ListeSchema = new mongoose.Schema({
    text: String,
    user: String,
    date: Date,

});

var Liste = mongoose.model('Liste', ListeSchema);
module.exports = Liste;