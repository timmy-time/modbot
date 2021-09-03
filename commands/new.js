const config = require("../config.json");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "new",
    category: "tickets",
    description: "Creates a ticket",
    run: async (client, message, args) => {
            
            if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
                return message.reply('you already have a ticket, please close your exsisting ticket first before opening a new one!');
            }

            message.guild.channels.create(`ticket-${message.author.id}`, { // {parent : "837310016833847297"},
                type: 'text',
                permissionOverwrites: [
                    {
                        id: message.author.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    },
                    {
                        id: "837616934572523540",
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    },
                    {
                        id: message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                ],
            }).then(async channel => {
                message.reply(`you have successfully created a ticket! Please click on ${channel} to view your ticket.`);
                channel.send(`Hi ${message.author}, welcome to your ticket! Please be patient, we will be with you shortly. If you would like to close this ticket please run \`${config.prefix}close\``);
                //await channel.setParent('837616961927381003');
                let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                if(logchannel) {
                    logchannel.send(`Ticket ${message.author.id} created. Click the following to veiw ${channel}`);
                }
            });

            
    }
}





    