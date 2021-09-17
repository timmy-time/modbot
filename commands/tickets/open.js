const config = require("../../config.json");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "open",
    category: "tickets",
    description: "opens a previously opened ticket or application.",
    run: async (client, messageCreate, args) => {
            if(messageCreate.channel.name.includes('ticket-')) {
                const member = messageCreate.guild.members.cache.get(messageCreate.channel.name.split('ticket-').join(''));
                try {
                    messageCreate.channel.updateOverwrite(member.user, {
                        VIEW_CHANNEL: true,
                        SEND_messageCreateS: true,
                        ATTACH_FILES: true,
                        READ_messageCreate_HISTORY: true,
                    })
                        .then(() => {
                            messageCreate.channel.send(`Successfully re-opened ${messageCreate.channel}`);
                            let logchannel = messageCreate.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                            if(logchannel) {
                                logchannel.send(`the ticket ${messageCreate.channel} has been reopened`);
                            }
                        });
                }
                catch (e) {
                    return messageCreate.channel.send('An error occurred, please try again!');
                }
            }
            else {
                return messageCreate.reply(
                    'you cannot use this command here. Please use this command on a closed ticket.',
                );
            }

    }
    }






    