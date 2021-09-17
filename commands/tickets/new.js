const config = require("../../config.json");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "new",
    category: "tickets",
    description: "Creates a ticket",
    run: async (client, messageCreate, args) => {
            
            if(messageCreate.guild.channels.cache.find(channel => channel.name === `ticket-${messageCreate.author.id}`)) {
                return messageCreate.reply('you already have a ticket, please close your exsisting ticket first before opening a new one!');
            }

            messageCreate.guild.channels.create(`ticket-${messageCreate.author.id}`, { // {parent : "837310016833847297"},
                type: 'text',
                permissionOverwrites: [
                    {
                        id: messageCreate.author.id,
                        allow: ['SEND_messageCreateS', 'VIEW_CHANNEL'],
                    },
                    {
                        id: "837616934572523540",
                        allow: ['SEND_messageCreateS', 'VIEW_CHANNEL'],
                    },
                    {
                        id: messageCreate.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                ],
            }).then(async channel => {
                messageCreate.reply(`you have successfully created a ticket! Please click on ${channel} to view your ticket.`);
                channel.send(`Hi ${messageCreate.author}, welcome to your ticket! Please be patient, we will be with you shortly. If you would like to close this ticket please run \`${config.prefix}close\``);
                //await channel.setParent('837616961927381003');
                let logchannel = messageCreate.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                if(logchannel) {
                    logchannel.send(`Ticket ${messageCreate.author.id} created. Click the following to veiw ${channel}`);
                }
            });

            
    }
}





    