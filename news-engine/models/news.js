var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var News = new Schema({
    title: String,
    category: String,
    content: String
});

module.exports = mongoose.model('News', News);