function calcScore(lengthPhrase, ms) {
    //ToDo:
    // Make MS ask in a global text
    let maxMs = 15000;
    let score = lengthPhrase / (maxMs / ms);
    return score
}

module.exports = { calcScore }