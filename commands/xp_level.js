const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
const config = require("../config.js")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "level",
            description: "Returns the user's xp level",

        });
    }

    async run({ client, respond, interaction, messageCreate, message}) { 
        let target = message.mentions.users.first() || message.author
        let curlvl = (db.get(`${message.guild.id}_${target.id}_exp.level`)) // Current Level
        let curxp = (db.get(`${message.guild.id}_${target.id}_exp.xp`)) // Current Xp
        
        const levelEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('XP Level')
        .addFields(
            { name: 'Current Level', value: `${curlvl}` },
            { name: 'Current XP', value: `${curxp}/${curlvl * 300}` },
        )
        .setTimestamp()

        message.channel.send({ embeds: levelEmbed});
    }
}