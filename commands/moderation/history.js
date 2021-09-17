const config = require("../../config.json");
const { MessageEmbed, RichEmbed, messageCreate } = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "history",
    category: "moderation",
    description: "Lists the history of the user provided.",
    run: async (client, messageCreate, args, arguments) => {
        try {
            const target = messageCreate.mentions.users.first()
            if (!target) {
                messageCreate.reply('Please specify a user to load the warnings for.')
            return
        }
        }catch(err) {
            const failedEmbed = new MessageEmbed()
                .addField(`Error`, err)
                .setFooter(`ModBot©2021`)
              messageCreate.channel.send(failedEmbed);
        }
        finally {
            const target = messageCreate.mentions.users.first()
                let warnlevel = db.get(`myUserWarns.${target.id}.${messageCreate.guild.id}.warns`);
                let warnreasons = db.get(`myUserWarns.${target.id}.${messageCreate.guild.id}.reasons`);
    
                let HistoryEmbed = new MessageEmbed()
                    .setTitle(`${target.username}'s History`)
                    .setFooter(`Command ran by ${messageCreate.author.username}`)
                    .setColor("#0099ff");
    
                    if (warnlevel = 0) {
                        HistoryEmbed.setDescription(`${target.username} has ${warnlevel} warnings.`)
                    } else {
                        let int = 0
                        for (warnreason in warnreasons) {
                            int++;
                            HistoryEmbed.addField(`Warn ${int}`, warnreasons[int-1], true)
                
                    
                    }
                    messageCreate.channel.send(HistoryEmbed);
                }
        }
    }
}