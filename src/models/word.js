const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let wordSchema = new Schema({
    'lang' : String,
    'word' : String,
})

module.exports = mongoose.model('word', wordSchema)