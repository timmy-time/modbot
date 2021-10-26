const { Discord, DiscordJS, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('quick.db');
const config = require("../config.js")

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
                                .setRequired(false),
                        )
                        .addIntegerOption((option) => 
                            option
                                .setName('id')
                                .setDescription("The id of the user to warn")
                                .setRequired(false)
                        )

                )
                // Adding a SubcommandGroup as 'add'
                .addSubcommand((subcommand) => 
                    subcommand
                        .setName("add")
                        .setDescription('Add a warning to the specified user.')
                        .addUserOption((subcommand) => 
                            subcommand
                                .setName('add')
                                .setDescription('Add a warning to the specificied user.')
                                .setRequired(true)
                        )
                        // Adding a StringOption as 'reason'
                        .addStringOption(option => 
                            option
                                .setName('reason')
                                .setDescription('Reason for the warning')
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
                                .setRequired(true))
                        )
                )   
            // Adding a SubcommandGroup as ''
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('show')
                    .setDescription('Show the users warnings')
                    .addUserOption((option) =>
                            option
                                .setName('user')
                                .setDescription("The user that you want to see.")
                                .setRequired(false)
                    ) 
            ),  
    async execute(interaction, message, args, option, client) {
        try {
            interaction.reply(interaction.options.getSubcommandGroup())
            interaction.reply(interaction.options.getSubcommand())
            interaction.reply(interaction.options.getString())
            interaction.reply(interaction.options.getUser())
            interaction.reply(interaction.options.getInteger())
        } catch (err) {
            console.log(err)
        }


    }
}