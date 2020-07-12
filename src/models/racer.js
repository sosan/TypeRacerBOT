const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let racerSchema = new Schema({
    'id': String,
    'allScores': [Number],
    'ratio': {type: Number, default: 1},
    'score': {type: Number, default: 1},
    'globalScore' : {type: Number, default: 1}
})

module.exports = mongoose.model('racer', racerSchema)
