const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clears the chat",
    run: async (client, messageCreate, args) => {            
        try {
                // Member doesn't have permissions
                if (!messageCreate.member.hasPermission("MANAGE_messageCreateS")) {
                    return messageCreate.reply("You are missing the permission to manage messageCreates.").then(m => m.delete(5000));
                }   

                // Check if args[0] is a number
                if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                    return messageCreate.reply("I can't find a number that is greater than 0.").then(m => m.delete(5000));
                }   

                // Maybe the bot can't delete messageCreates
                if (!messageCreate.guild.me.hasPermission("MANAGE_messageCreateS")) {
                    return messageCreate.reply("Sorry. I don't have permissions to manage messageCreates.").then(m => m.delete(5000));
                } else if (messageCreate.member.permissions.has("MANAGE_messageCreateS")) {
                    if (!args[0]) return messageCreate.reply("Specify the **amount** of messageCreates you want to delete!");
                    if (isNaN(args[0])) return messageCreate.reply("Enter a **real number**!");

                    if (args[0] > 100) return messageCreate.reply("You cannot delete more than 100 messageCreates!");
                    if (args[0] < 1) return messageCreate.reply("You cannot delete less than 1 messageCreate!");
                    
                    await messageCreate.channel.messageCreates.fetch({ limit: args[0] }).then(messageCreates => {
                        messageCreate.channel.bulkDelete(messageCreates);
                    });
            } 
        }catch (err) {
            messageCreate.channel.send(`${error}`)
        }
    }
}