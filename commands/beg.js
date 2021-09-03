const config = require("../config.json");
const { Discord, MessageEmbed, RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
const random = require('random')
const talkedRecently = new Set();
module.exports = {
    name: "beg",
    category: "currency",
    description: "Returns the balance",
    run: async (client, message, args) => {
        try {
            if (talkedRecently.has(message.author.id)) {
                message.channel.send(message.author.username + " Please wait 30 seconds before trying to beg again");
            } else {
    
               // the user can type the command ... your command code goes here :)
    
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(message.author.id);
                }, 30000);
        
    
    

                const target = message.mentions.users.first() || message.author
                if (db.has(`myUserBalance.${target.id}.wallet`) == false) { 
                    db.set(`myUserBalance.${target.id}`, { userid: `${target.id}`, wallet: 0, minbank: 0, maxbank: 1000,curbankamt: 0, items: []})
                }
                randint = random.int(0, 10)

                if (randint == 1) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                } else if (randint == 2) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                } else if (randint == 3) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                } else if (randint == 4) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);                    
                } else if (randint == 5) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                } else if (randint == 6) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                } else if (randint == 7) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                } else if (randint == 8) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                } else if (randint == 9) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                } else if (randint == 10) {
                    let rint = random.int(0, 250)
                    db.add(`myUserBalance.${target.id}.wallet`, rint)
                    const begEmbed = new MessageEmbed()
                        .setTitle(target.username)
                        .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                        .setFooter(`ModBot©2021`)
                    message.channel.send(begEmbed);
                }
            }            
        } catch(err) {
          const failedEmbed = new MessageEmbed()
                .addField(`Error`, err)
                .setFooter(`ModBot©2021`)
            message.channel.send(failedEmbed);
        }
    }
}