const sourcebin = require('sourcebin_js');
const config = require("../../config.json");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "close",
    category: "tickets",
    description: "Closes a ticket",
    run: async (client, messageCreate, args) => {

            if(messageCreate.channel.name.includes('ticket-')) {
                const member = messageCreate.guild.members.cache.get(messageCreate.channel.name.split('ticket-').join(''));
                if(messageCreate.member.hasPermission('ADMINISTRATOR') || messageCreate.channel.name === `ticket-${messageCreate.author.id}`) {
                    messageCreate.channel.messageCreates.fetch().then(async (messageCreates) => {
                        const output = messageCreates.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
    
                        let response;
                        try {
                            response = await sourcebin.create([
                                {
                                    name: ' ',
                                    content: output,
                                    languageId: 'text',
                                },
                            ], {
                                title: `Chat transcript for ${messageCreate.channel.name}`,
                                description: ' ',
                            });
                        }
                        catch(e) {
                            return messageCreate.channel.send('An error occurred, please try again!');
                        }
    
                        const embed = new MessageEmbed()
                            .setDescription(`[\`📄 View\`](${response.url})`)
                            .setColor('GREEN');
                        member.send('Here is a transcript of your ticket, please click the link below to vew the transcript', embed);
                    }).then(() => {
                        try {
                            messageCreate.channel.updateOverwrite(member.user, {
                                VIEW_CHANNEL: false,
                                SEND_messageCreateS: false,
                                ATTACH_FILES: false,
                                READ_messageCreate_HISTORY: false,
                            }).then(() => {
                                messageCreate.channel.send(`Successfully closed ${messageCreate.channel}`);
                            });
                        }
                        catch(e) {
                            return messageCreate.channel.send('An error occurred, please try again!');
                        }
                    });
                }
            }
            else {
                return messageCreate.reply('you cannot use this command here. Please use this command when you\'re closing a ticket.');
            }
        }
}





    