const {Discord, DiscordJS, MessageEmbed} = require('discord.js')
const SlashCommandBuilder = require('@discordjs/builders')
const db = require('quick.db')
const config = require('../config.js')

module.exports = {
    dasta: new SlashCommandBuilder()
    .setName("warn")
    .addSubcommandGroup((group) =>
    group
        .setName("manage")
        .addUserOption((option) =>
					option.setName('user').setDescription('The user whose xp to alter').setRequired(true),
		)
        .addSubcommandGroup((group) =>
        group
        .setName("add")
        .addUserOption((option) =>
					option.setName('add').setDescription('Add a warning to the specificied user.').setRequired(true),
		    )
        .addStringOption(option =>
            option.setName('Reason').setDescription('Reason for the warning')
        )
        
        .addSubcommandGroup((group) =>
        group
            .addUserOption((option) =>
					option.setName('remove').setDescription('Remove a warning from the specificied user.').setRequired(true),
		    )
        )
    )
    .addSubcommandGroup((group) =>
    group
        .setName("show")
        .addUserOption((option) =>
					option.setName('user').setDescription('The user whose xp to alter').setRequired(false),
		)
    )
)}