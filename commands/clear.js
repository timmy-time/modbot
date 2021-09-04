const config = require("../utils/config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clears the chat",
    run: async (client, messageCreate, args) => {            
        try {
                // Member doesn't have permissions
                if (!messageCreate.member.hasPermission("MANAGE_MESSAGES")) {
                    return messageCreate.reply("You are missing the permission to manage messages.").then(m => m.delete(5000));
                }   

                // Check if args[0] is a number
                if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                    return messageCreate.reply("I can't find a number that is greater than 0.").then(m => m.delete(5000));
                }   

                // Maybe the bot can't delete messages
                if (!messageCreate.guild.me.hasPermission("MANAGE_MESSAGES")) {
                    return messageCreate.reply("Sorry. I don't have permissions to manage messages.").then(m => m.delete(5000));
                } else if (messageCreate.member.permissions.has("MANAGE_MESSAGES")) {
                    if (!args[0]) return messageCreate.reply("Specify the **amount** of messages you want to delete!");
                    if (isNaN(args[0])) return messageCreate.reply("Enter a **real number**!");

                    if (args[0] > 100) return messageCreate.reply("You cannot delete more than 100 messages!");
                    if (args[0] < 1) return messageCreate.reply("You cannot delete less than 1 message!");
                    
                    await messageCreate.channel.messages.fetch({ limit: args[0] }).then(messageCreate => {
                        messageCreate.channel.bulkDelete(messageCreate);
                    });
            } 
        }catch (err) {
            messageCreate.channel.send(`${error}`)
        }
    }
}