const { MessageEmbed, Message, MessageAttachment } = require("discord.js");
const config = require("../config.js");
const db = require('quick.db');
const fs = require('fs');
const random = require('random')


module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./../commands/${file}`);
            interaction.client.commands.set(command.data.name, command);
        }
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `There was an error while executing this command!\n Error: ${error}`, ephemeral: false });
        }
    }
}