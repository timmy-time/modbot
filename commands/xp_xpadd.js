const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
const config = require("../config.js")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "xpadd",
            description: "",

        });
    }

    async run({ client, respond, interaction, messageCreate, message}) { 
        const args = message.content.startsWith(config.defaultprefix) ? message.content.slice(config.defaultprefix.length).trim().split(/ +/g) : message.content.replace(/[^\s]*/, "").trim().split(/ +/g);
        if (message.author.id != config.ownerid) return message.channel.send("You need to be the server owner to run this command.")
        
        if (args[0] >= 10001) {
            message.channel.send("This process isn't possible complete due to being over 10,000.")
        } else {
            let target = message.mentions.users.first() ||  message.author                                                  // Not grabbing Mentions //
            let curlvl = (db.get(`${message.guild.id}_${message.author.id}_exp.level`)) // Current Level
            let curxp = (db.get(`${message.guild.id}_${message.author.id}_exp.xp`)) // Current Xp
            db.add(`${message.guild.id}_${message.author.id}_exp.xp`, args[0])
            db.add(`${message.guild.id}_${message.author.id}_exp.allxp`, args[0])
            while (db.get(`${message.guild.id}_${message.author.id}_exp.xp`) >= curlvl * 300) {
                db.subtract(`${message.guild.id}_${message.author.id}_exp.xp`, curlvl * 300);
                db.add(`${message.guild.id}_${message.author.id}_exp.level`, 1);
            }
            message.channel.send("XPADD Command has been disabled.")
            
            let newlvl = (db.get(`${message.guild.id}_${message.author.id}_exp.level`)) // Current Level
            let newxp = (db.get(`${message.guild.id}_${message.author.id}_exp.xp`)) // Current Xp
            const levelEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('XP Add')
                .addFields(
                    { name: 'Old Level', value: `${curlvl}` },
                    { name: 'Old XP', value: `${curxp}/${curlvl * 300}` },
                    { name: 'New Level', value: `${newlvl}` },
                    { name: 'New XP', value: `${newxp}/${newlvl * 300}` },
                )
                .setTimestamp()
                .setFooter(config.footer)
    
            message.channel.send({embeds: levelEmbed});

        }
    }
}