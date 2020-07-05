const mongoose = require('mongoose');
const word = require('../models/word');

async function addNewWord(data) {
    let newWord = new word(data)
    let saved = await newWord.save();
    return saved
}


module.exports = { addNewWord }