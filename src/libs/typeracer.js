class TypeRacer {
    constructor() {
        this.winners = []
        this.losers = []
        this.gameStatus = false;
        this.startDate;
        this.quote = [
            "El murcielago esta triste",
            "No sabemos que hacer con el",
            "La verdad es que PHP no esta tan mal",
            "Las rotaciones son aburridas",
            "Dime tu signo del zodiaco",
            "Iván con B, como lo de los bancos",
            "El malo siempre alcanza al bueno",
            "Estoy muy cansado para esto",
            "Mira una película que sean todos buenos",
            "Voy a tirar las cajas de cartón",
            "Quieres que te llame por tu número",
            "Exprésate con corrección",
            "Han cambiado los signos del zodiaco",
            "Ofiuco no es un signo del zodiaco",
            "Es luna llena, tengo que cargar mis piedras"
        ];
        this.randIndex = 0;
        this.isShuffleCapital = false;
        this.shuffleCapital = "";
    }

    getGameStatus() {
        return this.gameStatus;
    }

    initGame() {
        this.gameStatus = true;
        this.randIndex = Math.round(Math.random() * (this.quote.length - 1))
        if(this.isShuffleCapital) this.shuffleCapitalLetters(this.quote[this.randIndex]);
    }

    setStartDate() {
        this.startDate = Date.now() //8491083471023481
    }

    addWinner(user) {
        this.winners.push(user)
    }
    addLoser(user){
        this.losers.push(user)
    }

    shuffleCapitalLetters(str) {
        let strToArray = str.split('')
        let frase = ""
        for (let i = 0; i < strToArray.length; i++) {
            let rand = Math.random()
            if (rand < 0.5) {
                frase = frase + strToArray[i].toUpperCase()
            } else {
                frase = frase + strToArray[i].toLowerCase()
            }
        }
        this.shuffleCapital = frase
    }

    ifSomeUserAlreadyAnswered(userDiscord){
        let isUserRepeated = false
        this.winners.forEach((user) =>{
            if(userDiscord == user.userId){
                isUserRepeated = true
            }
        });

        this.losers.forEach((user) =>{
            if(userDiscord == user.userId){
                isUserRepeated = true
            }
        });

        return isUserRepeated
    }

    getQuote() {
        
        let strRaw = this.quote[this.randIndex]
        let splitToOfuscated = strRaw.split(" ").join("_")
        //FUN MODE START
        if(this.isShuffleCapital){
            strRaw = this.shuffleCapital
            splitToOfuscated = this.shuffleCapital.split(" ").join("_")
        }
        //FUN MODE END
        return {
            ofuscated: splitToOfuscated,
            raw: strRaw
        }
    }

    showLadder(msg) {
        setTimeout(() => {
            let frase = ""
            this.gameStatus = false;
            for (let i = 0; i < this.winners.length; i++) {
                frase = `${frase}${i == 0 ? "**--Ganadores--**\n" : ""}${i + 1}- <@${this.winners[i].userId}> con el tiempo de: **${this.winners[i].timeToWin}ms**\n`
            }
            for(let i = 0 ; i < this.losers.length; i++){
                frase = `${frase}${i == 0 ? "**--Perdedores--**\n" : ""}${i + 1}- <@${this.losers[i].userId}> con el tiempo de: **${this.losers[i].timeToWin}ms**\n`
            }
            msg.channel.send(frase == "" ? "💔 💔 💔 Nadie lo consiguio 💔 💔 💔" : frase)
  
            this.winners = []
        }, 15000);
    }
}

module.exports = TypeRacer