const { Discord, DiscordJS, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('quick.db');
const random = require('random')
const config = require("../config.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("removes xp from a user")
    
    .addSubcommandGroup((group) =>
	group
		.setName('manage')
		.setDescription('Shows or manages xp in the server')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('user')
				.setDescription("Alters a user's xp")
				.addUserOption((option) =>
					option.setName('user').setDescription('The user whose xp to alter').setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName('action')
						.setDescription('What action should be taken with the users xp?')
						.addChoices([
							['Add xp', 'add'],
							['Remove xp', 'remove'],
							['Set xp', 'set'],
						])
						.setRequired(true),
				)
				.addIntegerOption((option) => option.setName('xp').setDescription('xp to add, remove, set').setRequired(true)),
        ),
    ).addSubcommandGroup((group) =>
    group
        .setName('leaderboard')
        .setDescription("Gets the leaderboard of levels or xp")
        .addSubcommand((subcommand) =>
                subcommand.setName('level').setDescription('Gets the leaderboard of levels'),
        )
        .addSubcommand((subcommand) =>
                subcommand.setName('xp').setDescription('Gets the leaderboard of xp'),
        )
    )
    .addSubcommandGroup((group) =>
        group
            .setName('level')
            .setDescription("Gets the targeted user's Level and XP")
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('user')
                    .setDescription("Alters a user's xp")
                    .addUserOption((option) =>
                        option.setName('user').setDescription('The user whose xp to alter').setRequired(true),
                    )
                )
    ),
    async execute(interaction, message, messageCreate, args, option, client) {
        try {
            if (interaction.options.getSubcommandGroup() === 'manage') {
                if (interaction.options.getString('action') === 'add') {
                    //if (config.ownerid != user.id) return interaction.reply("You need to be the server owner to run this command.")
                    const user = interaction.options.getUser('user');
                    const amount = interaction.options.getInteger('xp');
                    if (amount >= 10001) {
                        interaction.reply("This process isn't possible complete due to being over 10,000.")
                    } else {
                        if (db.has(`exp_${interaction.guild.id}_${user.id}.xp`) == false) {
                            db.set(`exp_${interaction.guild.id}_${user.id}`, { xp: 0, level: 1, allxp: 0})
                        }
                        let curlvl = (db.get(`exp_${interaction.guild.id}_${user.id}.level`)) // Current Level
                        let curxp = (db.get(`exp_${interaction.guild.id}_${user.id}.xp`)) // Current Xp
                        db.add(`exp_${interaction.guild.id}_${user.id}.xp`, amount)
                        db.add(`exp_${interaction.guild.id}_${user.id}.allxp`, amount)
                        while (db.get(`exp_${interaction.guild.id}_${user.id}.xp`) >= curlvl * 300) {
                            db.subtract(`exp_${interaction.guild.id}_${user.id}.xp`, curlvl * 300);
                            db.add(`exp_${interaction.guild.id}_${user.id}.level`, 1);
                        }
                        let newlvl = (db.get(`exp_${interaction.guild.id}_${user.id}.level`)) // Current Level
                        let newxp = (db.get(`exp_${interaction.guild.id}_${user.id}.xp`)) // Current Xp
                        const levelEmbed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('XP Add')
                            .addFields(
                                { name: 'Old Level', value: `${curlvl}` },
                                { name: 'Old XP', value: `${curxp}/${curlvl * 300}` },
                                { name: 'New Level', value: `${newlvl}` },
                                { name: 'New XP', value: `${newxp}/${newlvl * 300}` },
                            )
                            .setTimestamp()
                            .setFooter(config.footer)
                        interaction.reply({ ephemeral: true, embeds: [levelEmbed]});
                    }
                } else if (interaction.options.getString('action') === 'remove') {
                    const user = interaction.options.getUser('user');
                    const amount = interaction.options.getInteger('xp');
                    if (db.has(`exp_${interaction.guild.id}_${user.id}.xp`) == false) {
                        db.set(`exp_${interaction.guild.id}_${user.id}`, { xp: 0, level: 1, allxp: 0})
                    }
                    const allxp = db.get(`exp_${interaction.guild.id}_${user.id}.allxp`)
                    if (!allxp) return interaction.reply("This user has no XP!")
                    if (allxp < amount) return interaction.reply("This user has less XP than you are trying to remove!")
                    let curlvl = (db.get(`exp_${interaction.guild.id}_${user.id}.level`)) // Current Level
                    let curxp = (db.get(`exp_${interaction.guild.id}_${user.id}.xp`)) // Current Xp
                    db.subtract(`exp_${interaction.guild.id}_${user.id}.allxp`, amount)
                    db.set(`exp_${interaction.guild.id}_${user.id}.xp`, 0)
                    db.set(`exp_${interaction.guild.id}_${user.id}.level`, 0);
                    while (db.get(`exp_${interaction.guild.id}_${user.id}.xp`) >= curlvl * 300) {
                        db.subtract(`exp_${interaction.guild.id}_${user.id}.xp`, curlvl * 300);
                        db.add(`exp_${interaction.guild.id}_${user.id}.level`, 1);   
                        console.log(db.get(`exp_${interaction.guild.id}_${user.id}`))
                    }
                    let newlvl = (db.get(`exp_${interaction.guild.id}_${user.id}.level`)) // Current Level
                    let newxp = (db.get(`exp_${interaction.guild.id}_${user.id}.xp`)) // Current Xp
                    const levelEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('XP Remove')
                        .addFields(
                            { name: 'Old Level', value: `${curlvl}` },
                            { name: 'Old XP', value: `${curxp}/${curlvl * 300}` },
                            { name: 'New Level', value: `${newlvl}` },
                            { name: 'New XP', value: `${newxp}/${newlvl * 300}` },
                        )
                        .setTimestamp()
                        .setFooter(config.footer)
                    interaction.reply({embeds: [levelEmbed]});
                } else if (interaction.options.getString('action') === 'set') {
                    const user = interaction.options.getUser('user');
                    const amount = interaction.options.getInteger('xp');
                    if (db.has(`exp_${interaction.guild.id}_${user.id}.xp`) == false) {
                        db.set(`exp_${interaction.guild.id}_${user.id}`, { xp: 0, level: 1, allxp: 0})
                    }
                    const allxp = db.get(`exp_${interaction.guild.id}_${user.id}.allxp`)
                    let curlvl = (db.get(`exp_${interaction.guild.id}_${user.id}.level`)) // Current Level
                    let curxp = (db.get(`exp_${interaction.guild.id}_${user.id}.xp`)) // Current Xp
                    db.set(`exp_${interaction.guild.id}_${user.id}.allxp`, amount)
                    db.set(`exp_${interaction.guild.id}_${user.id}.xp`, amount)
                    db.set(`exp_${interaction.guild.id}_${user.id}.level`, 1)
                    while (db.get(`exp_${interaction.guild.id}_${user.id}.xp`) >= curlvl * 300) {
                        db.add(`exp_${interaction.guild.id}_${user.id}.level`, 1);   
                        db.subtract(`exp_${interaction.guild.id}_${user.id}.xp`, curlvl * 300);
                        console.log(db.get(`exp_${interaction.guild.id}_${user.id}`))
                    }
                    let newlvl = (db.get(`exp_${interaction.guild.id}_${user.id}.level`)) // New Level
                    let newxp = (db.get(`exp_${interaction.guild.id}_${user.id}.xp`)) // New Xp
                    const levelEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('XP Set')
                        .addFields(
                            { name: 'Old Level', value: `${curlvl}` },
                            { name: 'Old XP', value: `${curxp}/${curlvl * 300}` },
                            { name: 'New Level', value: `${newlvl}` },
                            { name: 'New XP', value: `${newxp}/${newlvl * 300}` },
                        )
                        .setTimestamp()
                        .setFooter(config.footer)
                    interaction.reply({embeds: [levelEmbed]});
                }
            } else if (interaction.options.getSubcommandGroup() === 'leaderboard') {
                if (interaction.options.getSubcommand('leaderboard') === 'xp') {
                    let content = "";
                    let xp = db.all().filter(data => data.ID.startsWith(`exp_${interaction.guild.id}_`)).sort((a, b) => (a.data < b.data) ? 1 : -1);
                    xp.length = 10;
                    try {
                        for (var i in xp) {
                            content += `**${xp.indexOf(xp[i])+1}.**     <@${xp[i].ID.slice(23)}> - \`${db.get(`exp_${interaction.guild.id}_${xp[i].ID.slice(23)}.allxp`)} xp\`\n`;
                        }
                    } catch(e) {
                        console.log(e)
                    }
                    console.log(`Content: ${content}`)
                    const embed = new MessageEmbed()
                    .setDescription(`**${interaction.guild.name}'s XP Leaderboard**\n\n${content}`)
                    .setColor("#FFFFFF")
                    interaction.reply({embeds: [embed]});
                } else if (interaction.options.getSubcommand('leaderboard') === 'level') {
                    let content = "";
                    let xp = db.all().filter(data => data.ID.startsWith(`exp_${messageCreate.guild.id}_`)).sort((a, b) => (a.data < b.data) ? 1 : -1);
                    xp.length = 10;
                    try {
                        for (var i in xp) {
                            content += `**${xp.indexOf(xp[i])+1}.**     <@${xp[i].ID.slice(23)}> - `+ '`' + `Level ${db.get(`exp_${interaction.guild.id}_${xp[i].ID.slice(23)}.level`)}`+ '`';
                        }
                    } catch(e) {
                        console.log(e)
                    }
                    console.log(`Content: ${content}`)
                    const embed = new MessageEmbed()
                    .setDescription(`**${interaction.guild.name}'s Level Leaderboard**\n\n${content}`)
                    .setColor("#FFFFFF")
                    interaction.reply({embeds: [embed]});
                }
            } else if (interaction.options.getSubcommandGroup() === 'level') {
                const user = interaction.options.getUser('user');
                let curlvl = (db.get(`exp_${interaction.guild.id}_${user.id}.level`)) // Current Level
                let curxp = (db.get(`exp_${interaction.guild.id}_${user.id}.xp`)) // Current Xp
                
                const levelEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('XP Level')
                .addFields(
                    { name: 'Current Level', value: `${curlvl}` },
                    { name: 'Current XP', value: `${curxp}/${curlvl * 300}` },
                )
                .setTimestamp()
                .setFooter(config.footer)
        
                interaction.reply({embeds: [levelEmbed]});
            }
        } catch (err) {
            console.log(err)
        }
    }
}