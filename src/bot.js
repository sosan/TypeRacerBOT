require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const typeRacer = require('./libs/typeracer');
const helper = require('./libs/helpers');
const raceCommands = require('./commands/raceCommands');
const listRace = require('./libs/listRace');

mongoose.connect('mongodb://localhost/typerace', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("DataBase: OK")
})

client.on('ready', function () {
  console.log("TypeRacer: OK ");
});

//let newRace = new typeRacer()

client.on('message', async (msg) => {

  console.log(msg.guild.emojis)
  //utils to handle message
  let findActiveRace = listRace.findRace(listRace.races, msg.channel.id);
  let msgSplit = msg.content.split(" ");

  let foundLang = helper.languages.filter((lang) => {
    if (lang == msgSplit[1]) { return lang }
  })

  //commands
  if (msg.content.toLowerCase().startsWith("!typerace")) {
    listRace.races = listRace.removeFinishedRaces(races)
    if (findActiveRace == null || findActiveRace.finished) {
      listRace.races.push(new typeRacer(msg.channel.id))
      let findActiveRace_ = listRace.findRace(listRace.races, msg.channel.id)
      await raceCommands.typeRaceCommand(findActiveRace_, msg, foundLang)
    }

  }

  if (findActiveRace) {
    if (findActiveRace.gameStatus && !findActiveRace.ifSomeUserAlreadyAnswered(msg.author.id)) {
      raceCommands.userAnswer(findActiveRace, msg)
    }

    if (msg.content.toLowerCase().startsWith("!addword")) {
      await raceCommands.addWord(msg, foundLang)
    }
  }
});


client.login(process.env.DISCORD_TOKEN);