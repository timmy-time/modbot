const config = require("../utils/config.json");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "open",
    category: "tickets",
    description: "opens a previously opened ticket or application.",
    run: async (client, message, args) => {
            if(message.channel.name.includes('ticket-')) {
                const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
                try {
                    message.channel.updateOverwrite(member.user, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                    })
                        .then(() => {
                            message.channel.send(`Successfully re-opened ${message.channel}`);
                            let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                            if(logchannel) {
                                logchannel.send(`the ticket ${message.channel} has been reopened`);
                            }
                        });
                }
                catch (e) {
                    return message.channel.send('An error occurred, please try again!');
                }
            }
            else {
                return message.reply(
                    'you cannot use this command here. Please use this command on a closed ticket.',
                );
            }

    }
    }






    