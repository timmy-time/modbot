const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

const config = require('../config.js')
module.exports = class extends Command { 
    constructor(...args) {
        super(...args, {
            name: "warn", // name of the command
            description: "Returns the economy balance of the user.", 
            minArgs: 1, // Minimum number of arguments for the command to be valid

        });
    }
    async run({ client, respond, interaction, messageCreate, message}) { 
        try {
            const args = message.content.startsWith(config.defaultprefix) ? message.content.slice(config.defaultprefix.length).trim().split(/ +/g) : message.content.replace(/[^\s]*/, "").trim().split(/ +/g); 
            let moderationType = "Warn" // Moderation type
            let moderationDerivedType = "Warned" // Moderation derived type
            if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`You are missing permission of "MANAGE_MESSAGES" permissions.`); // Checks if the user has the permission to use the command.
            const target = message.mentions.members.first();
            if(message.member.roles.highest.position <= target.roles.highest.position) {
                const highOrEqualRole = new MessageEmbed()
                    .setTitle(`Command could not be ran.`)
                    .addField(`Error:`, `Your role is equal or lower than the person you are trying to warn.`)
                    .setFooter(`ModBot©2021`)
                message.channel.send(highOrEqualRole);
            } else {
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
                    .addField(`Reason`, `${reason}`)
                    .setFooter(`${config.footer}`)
                message.channel.send({ embeds: successEmbed});
            }
        } catch (err) {
            client.channels.cache.get("892734251785682976").send(`Error: ${err}`);           
                
        }
    }
} 
