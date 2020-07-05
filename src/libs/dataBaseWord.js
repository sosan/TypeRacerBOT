const mongoose = require('mongoose');
const word = require('../models/word');

async function addNewWord(data) {
    let newWord = new word(data)
    let saved = await newWord.save();
    return saved
}

async function getAllWords(data) {
    let getAllWords = await word.find(data)
    let onlyWords = getAllWords.map((dataBaseObj) => {
        return dataBaseObj.word
    })
    
    return onlyWords
}


module.exports = { addNewWord, getAllWords }