const { Discord, DiscordJS, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('quick.db');
const config = require("../config.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        // Adding a SubcommandGroup as 'manage'
        .addSubcommandGroup((group) => 
            group
                .setName("manage")
                .addSubcommand((subcommand) => 
                    subcommand
                        .addUserOption((option) => 
                            option
                            .setName('user')
                        .setDescription('The user whose xp to alter')
                        .setRequired(false),
                        )
                        .addIntergerOption((option) => 
                            option.setName('id')
                                .setDescription("The id of the user to warn")
                                .setRequired(false)
                        )

                )
                // Adding a SubcommandGroup as 'add'
                .addSubcommand((subcommand) => 
                    subcommand
                        .setName("add")
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


                // Adding a SubcommandGroup as 'remove'
                .addSubcommandGroup((group) => 
                    group
                        .setName("remove")
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
                    .setName("show")
                    .addUserOption((option) =>
                        option
                            .setName('user')
                            .setDescription('The user whose xp to alter')
                            .setRequired(false)
                    )
            )                
    ),
    async execute(interaction, message, messageCreate, args, option, client) {
        try {
            interaction.reply(interaction.guild)
        } catch (err) {
            console.log(err)
        }


    }
}