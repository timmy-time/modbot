const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
const config = require("../config.js")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "clear",
            aliases: ["purge", "nuke"],
            description: "Clears up to 100",
            minArgs: 1,

        });
    }

    async run({ client, respond, interaction, messageCreate, message}) { 
        const args = message.content.startsWith(config.defaultprefix) ? message.content.slice(config.defaultprefix.length).trim().split(/ +/g) : message.content.replace(/[^\s]*/, "").trim().split(/ +/g);


        // Member doesn't have permissions
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("You are missing the permission to manage messageCreates.").then(m => m.delete(5000));
        }   

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("I can't find a number that is greater than 0.").then(m => m.delete(5000));
        }   

        // Maybe the bot can't delete messageCreates
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("Sorry. I don't have permissions to manage messages.").then(m => m.delete(5000));
        } else if (message.member.permissions.has("MANAGE_MESSAGES")) {
            if (!args[0]) return message.reply("Specify the **amount** of messages you want to delete!");
            if (isNaN(args[0])) return message.reply("Enter a **real number**!");
            if (args[0] > 100) return message.reply("You cannot delete more than 100 messages!");
            if (args[0] < 1) return message.reply("You cannot delete less than 1 message!");
            try {
                message.channel.bulkDelete(args[0]).catch(err => {
                    message.channel.send(':x: Due to Discord Limitations, I cannot delete messages older than 14 days') })
      
              let msg = await message.channel.send(`Deleted \`${args[0]}\` messages`)
              setTimeout(() => {
                  msg.delete()
              }, 2000)
            } catch (err) {
                client.channels.cache.get("892734251785682976").send({embeds: errorEmbed});
            }
        } 
    }
}
