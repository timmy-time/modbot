const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
const config = require('../config.js')


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "warn",
            description: "Returns the economy balance of the user.",
            minArgs: 1,

        });
    }

    async run({ client, respond, interaction, messageCreate, message}) { 
        const args = message.content.startsWith(config.defaultprefix) ? message.content.slice(config.defaultprefix.length).trim().split(/ +/g) : message.content.replace(/[^\s]*/, "").trim().split(/ +/g);
        let moderationType = "Warn"
        let moderationDerivedType = "Warned"
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`You are missing permission of "MANAGE_MESSAGES" permissions.`);
        let target = message.mentions.users.first()
        if(!target) return message.reply("Couldn't find the user.");
        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'Unspecified';
        if (db.has(`${message.guild.id}_${target.id}_moderation_warns.warns`) == false) {
            db.set(`${message.guild.id}_${target.id}_moderation_warns`, { userid: `${target.id}`, guild: `${message.guild.id}`, warns: 0, reasons: []})
        }
        db.add(`${message.guild.id}_${target.id}_moderation_warns.warns`, 1)
        db.push(`${message.guild.id}_${target.id}_moderation_warns.reasons`, reason)
        const successEmbed = new MessageEmbed()
            .setTitle('Moderation Log')
            .addField(moderationDerivedType, `${target}`)
            .addField(`${moderationDerivedType} By`, message.author.username)
            .addField(`Reason`,`${reason}`)
            .setFooter(`ModBot©2021`)
        message.channel.send({ embeds: successEmbed});
    }
} 
