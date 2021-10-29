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
            .addSubcommandGroup((group) =>
                group
                    .setName('show')
                    .setDescription('Show the users warnings')
                    
                    .addSubcommand((subcommand) => 
                        subcommand
                            .setName("user")
                            .setDescription('Remove one of the warnings')
                            .addUserOption((option) =>
                                option
                                    .setName('user')
                                    .setDescription("The user that you want to see.")
                                    .setRequired(true)
                            )
                    )  
            ),  
    async execute(interaction, message, args, option, client) {
        try {
            interaction.reply(`${interaction.options.getSubcommandGroup()}\n${interaction.options.getSubcommand()}\n${interaction.options.getString()}\n${interaction.options.getUser()}\n${interaction.options.getInteger()}`)
        } catch (err) {
            console.log(err)
        }


    }
}