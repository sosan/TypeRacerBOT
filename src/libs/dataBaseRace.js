const race = require('../models/race');
const { findRace } = require('./listRace');

async function addNewRace(obj) {
    let newRace = new race(obj)
    let saved = await newRace.save()
    return saved;
}

async function getWinsAndLosses(id) {
    let findRacer = await race.find({ "racers.id": id }).exec();
    console.log(findRacer)
    let wins = 1;
    let losses = 1;
    findRacer.forEach((race) => {
        if (race.racers.length != 0) {
            console.log("ADD")
            race.racers.forEach((el) => { el.isWinner ? wins++ : losses++ });
        }
    })
    console.log(wins)
    console.log(losses)
    let windAndLosses = (wins / losses);
    return windAndLosses;
}

module.exports = { addNewRace, getWinsAndLosses }