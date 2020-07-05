const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let racerSchema = new Schema({
    'id': String,
    'score' : Number,
    'numberOfWins' : Number,
    'numberOfLosses' : Number,
})

module.exports = mongoose.model('racer', racerSchema)