const config = require("../../config.json");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "add",
    category: "tickets",
    description: "Deletes the ticket channel.",
    run: async (client, messageCreate, args, channel) => {
		if(messageCreate.channel.name.includes('ticket-')) {
			const member = messageCreate.mentions.members.first() || messageCreate.guild.members.cache.get(args[0]) || messageCreate.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return messageCreate.channel.send(`Incorrect Usage! Correct Usage:${config.prefix}add <member>`);
			}
			try{
				messageCreate.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_messageCreateS: true,
					ATTACH_FILES: true,
					READ_messageCreate_HISTORY: true,
				}).then(() => {
					messageCreate.channel.send(`Successfully added ${member} to ${messageCreate.channel}`);
					let logchannel = messageCreate.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
					if(logchannel) {
						logchannel.send(`${member} was added to this ticket ${messageCreate.channel}`);
					}
				});
			}
			catch(e) {
				return messageCreate.channel.send('An error occurred, please try again!');
			}
		}
	}
}





    