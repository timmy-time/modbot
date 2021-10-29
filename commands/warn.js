const { Discord, DiscordJS, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('quick.db');
const config = require("../config.js");
const { userInfo } = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription('Check or manage Warnings')
        // Adding a SubcommandGroup as 'manage'
        .addSubcommandGroup((group) => 
            group
                .setName("manage")
                .setDescription('Manage the warnings of a user.')
                .addSubcommand((subcommand) => 
                    subcommand
                        .setName('user')
                        .setDescription('Decide the user')
                        .addUserOption((option) => 
                            option
                                .setName('user')
                                .setDescription('The user whose xp to alter')
                                .setRequired(true),
                        )

                )
                // Adding a SubcommandGroup as 'add'
                .addSubcommand((subcommand) => 
                    subcommand
                        .setName("add")
                        .setDescription('Add a warning to the specified user.')
                        .addUserOption((subcommand) => 
                            subcommand
                                .setName('user')
                                .setDescription('The user whose xp to alter')
                                .setRequired(true)
                        )
                        // Adding a StringOption as 'reason'
                        .addStringOption(option => 
                            option
                                .setName('reason')
                                .setDescription('Reason for the warning')
                                .setRequired(false),
                        )

                )
                // Adding a Subcommand as 'remove'
                .addSubcommand((subcommand) => 
                    subcommand
                        .setName("remove")
                        .setDescription('Remove one of the warnings')
                        .addUserOption((option) =>
                            option
                                .setName('remove')
                                .setDescription('Remove a warning from the specificied user.')
                                .setRequired(true)),
                        )
                )
            
        // Adding a SubcommandGroup as 'show'
        .addSubcommandGroup((group) =>
            group
                .setName("show")
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('The user whose xp to alter')
                        .setRequired(true),
                )
        ),
    async execute(interaction, message, messageCreate, args, option, client) {
        console.log(interaction.options.getSubcommandGroup())
        console.log(interaction.options.getSubcommand())
        console.log(interaction.options.getString())
        try {
            if(interaction.options.getSubcommandGroup() == "manage") {
                if(interaction.options.getSubcommand() == "add") {
                let user = await interaction.options.getUser('user');
                let reason = await interaction.options.getString('reason');
                }
            } else if (interaction.options.getSubcommandGroup() == "show") {
                let user = await interaction.options.getUser('user');
                let reason = await interaction.options.getString('reason');
            }
        } catch (error) {
            console.log(error)
        }
    }
}