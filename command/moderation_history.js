const { Discord, MessageEmbed, RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
const { Command } = require("gcommands");
module.exports = class extends Command {
    constructor(client) {
      super(client, {
            name: "history",
            description: "Returns the history of the given user.",
            cooldown: "5s",
            slash: true
        });
    }

    async run({ client, respond, interaction, messageCreate, message }, args) { 
        try {
            const target = message.mentions.users.first()
            if (!target) {
                message.reply('Please specify a user to load the warnings for.')
            return
        }
        }catch(err) {
            const failedEmbed = new MessageEmbed()
                .addField(`Error`, err)
                .setFooter(`ModBotÂ©2021`)
              message.channel.send(failedEmbed);
        }
        finally {
            const target = message.mentions.users.first()
                let warnlevel = db.get(`${message.guild.id}_${target.id}_moderation_warns.warns`);
                console.log(warnlevel)
                let warnreasons = db.get(`${message.guild.id}_${target.id}_moderation_warns.reasons`);
                console.log(warnreasons)
    
                let HistoryEmbed = new MessageEmbed()
                    .setTitle(`${target}'s Histroy`)
                    .setFooter(`Command ran by ${message.author.username}`)
                    .setColor("#0099ff");
    
                    if (warnlevel = 0) {
                        HistoryEmbed.setDescription(`<@${target.id}> has ${warnlevel} warnings.`)
                    } else {
                        let int = 0
                        let warnreason = ""
                        for (warnreason in warnreasons) {
                            int++;
                            HistoryEmbed.addField(`Warn ${int}`, warnreason)
                
                    
                    }
                    message.channel.send(HistoryEmbed);
            }
        }
    }
}