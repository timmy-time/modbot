        const sourcebin = require('sourcebin_js');
		const config = require("../../config.json");
        const { Discord, MessageEmbed } = require("discord.js");
        module.exports = {
            name: "transcript",
            category: "tickets",
            description: "Creates a transcript of the messageCreates and puts it in a sourcebin link",
            run: async (client, messageCreate, args) => {
                    const channel = messageCreate.mentions.channels.first() || messageCreate.guild.channels.cache.get(args[0]) || messageCreate.channel;
                    if(messageCreate.channel.name.includes('ticket-')) {
                        if (messageCreate.member.hasPermission('ADMINISTRATOR') || channel.name === `ticket-${messageCreate.author.id}`) {
                            channel.messageCreates.fetch().then(async (messageCreates) => {
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
                                        title: `Chat transcript for ${channel.name}`,
                                        description: ' ',
                                    });
                                }
                                catch(e) {
                                    return messageCreate.channel.send('An error occurred, please try again!');
                                }

                                const embed = new MessageEmbed()
                                    .setDescription(`[\`📄 View\`](${response.url})`)
                                    .setColor('GREEN');
                                messageCreate.reply('the transcript is complete. Please click the link below to view the transcript', embed);
                                let logchannel = messageCreate.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                                if(logchannel) {
                                    logchannel.send(`Transcript was taken of the ticket ${channel} by ${messageCreate.author.username}`);
                                }
                            });
                        }
                    }
                    else {
                        return messageCreate.reply(
                            'you cannot use this command here. Please use this command in a open ticket.',
                        );
                    }
                

}
}