const config = require("../../config.json");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "delete",
    category: "tickets",
    description: "Deletes the ticket channel.",
    run: async (client, messageCreate, args) => {

            if(messageCreate.channel.name.includes('ticket-')) {
                messageCreate.channel.delete();
                let logchannel = messageCreate.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                if(logchannel) {
                    logchannel.send(`${messageCreate.channel.name} has been deleted by ${messageCreate.author.username}.`);
                }
            }
            else {
                return messageCreate.reply('you cannot use this command here. Please use this command when you want to delete a ticket.');
            }
        
    }
}





    