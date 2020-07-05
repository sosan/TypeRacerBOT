require('dotenv').config();
const Discord = require('discord.js');
const mongoose = require('mongoose');
const client = new Discord.Client();
const dataBaseWord = require('./libs/dataBaseWord');
const typeRacer = require('./libs/typeracer');
const helper = require('./libs/helpers');
const raceCommands = require('./commands/raceCommands');

let races = []

mongoose.connect('mongodb://localhost/typerace', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("DataBase: OK")
})

client.on('ready', function () {
  console.log("TypeRacer: OK ");
});

//let newRace = new typeRacer()

client.on('message', async (msg) => {
  //utils to handle message
  let findActiveRace = findRace(races, msg.channel.id)
  let msgSplit = msg.content.split(" ")
  let langFromMessage = msgSplit[1]

  let foundLang = helper.languages.filter((lang) => {
    if (lang == langFromMessage) { return lang }
  })

  //commands
  if (msg.content.toLowerCase().startsWith("!typerace")) {
    if(findActiveRace == null){
      races.push(new typeRacer(msg.channel.id))
      let findActiveRace_ = findRace(races, msg.channel.id)
      console.log(findActiveRace_)
      await raceCommands.typeRaceCommand(findActiveRace_, msg, foundLang)
    }
  }

  if (findActiveRace) {
    if (findActiveRace.gameStatus && !findActiveRace.ifSomeUserAlreadyAnswered(msg.author.id)) {
      raceCommands.userAnswer(findActiveRace, msg)
    }

    if (msg.content.toLowerCase().startsWith("!addword")) {
      await raceCommands.addWord(msg, foundLang, langFromMessage)
    }
  }
});


client.login(process.env.DISCORD_TOKEN);

function findRace(listRaces, idChannelDiscord) {
  let actualRace = null;
  listRaces.forEach((race) => {
    if (race.idChannel == idChannelDiscord)
      actualRace = race
  });
  return actualRace
}

function removeRaces(list) {
  for (let i = list.length - 1; i--;) {
    if (list[i] === 'foo') {
      list.splice(i, 1);
    }
  }
}