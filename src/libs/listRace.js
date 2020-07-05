let races = []

function findRace(listRaces, idChannelDiscord) {
    let actualRace = null;
    listRaces.forEach((race) => {
        if (race.idChannel == idChannelDiscord)
            actualRace = race
    });
    return actualRace
}

function removeFinishedRaces(list) {
    return list.filter(function (race) {
        if (!race.finished) {
            return race
        }
    });
}


module.exports = { findRace, removeFinishedRaces, races }