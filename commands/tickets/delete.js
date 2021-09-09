const config = require("../../config.json");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "delete",
    category: "tickets",
    description: "Deletes the ticket channel.",
    run: async (client, message, args) => {

            if(message.channel.name.includes('ticket-')) {
                message.channel.delete();
                let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                if(logchannel) {
                    logchannel.send(`${message.channel.name} has been deleted by ${message.author.username}.`);
                }
            }
            else {
                return message.reply('you cannot use this command here. Please use this command when you want to delete a ticket.');
            }
        
    }
}





    