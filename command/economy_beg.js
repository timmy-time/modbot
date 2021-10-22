const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random');
let rint = 0;
msgArray = [`coin.exe has stopped working`, `I only give money to hookers`, `go ask someone else`,`oh heck nah`,`the atm is out of order, sorry`, `bye jerk, no coins for you`, `ew no`, `back in my day we worked for a living`, `i would not share with the likes of you`, `ew get away`, `ew get away`, `can you not`, `nah, would rather not feed your gambling addiction`, `ok sure, you have ${rint}`, `ur a bit stanky but here's ${rint} coins`, `Oh, you poor little beggar, take ${rint} coins`, `you get ${rint} COINS`, `${rint} coins for you`];
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "beg",
            description: "Returns the economy balance of the user.",
            cooldown: "15m",
        });
    }

    async run({ client, respond, interaction, messageCreate, message }, args) {  
        if (db.has(`eco_${message.author.id}.wallet`) == false) { 
            db.set(`eco_${message.author.id}`, { userid: `${message.author.id}`, totalbal: 0, wallet: 0, minbank: 0, maxbank: 1000,curbankamt: 0, daily: 0, items: []})
        }
        let randint = random.int(0, msgArray.length)
        let output = msgArray[randint]
        if (output.includes(`${rint}`)) {    
            let rint = random.int(0, 250)
        } else {
            let rint = 0
        }
        db.add(`eco_${message.author.id}.wallet`, rint)
        db.add(`eco_${message.author.id}.totalbal`, rint)
        const begEmbed = new MessageEmbed()
            .setTitle(message.author.username)
            .addField(`Beg`, output)
            .setFooter(config.footer)
        message.channel.send({ embeds: begEmbed }); 
        

    }
}