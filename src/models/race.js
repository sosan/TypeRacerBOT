const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let raceSchmea = new Schema({
    phrase : String,
    racers:[{
        id : String,
        position: Number,
        ms : Number,
        isWinner : Boolean
    }]
})

module.exports = mongoose.model('race', raceSchmea)