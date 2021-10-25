const { MessageEmbed, MessageCreate, MessageCreateAttachment } = require("discord.js");
const { MessageCreateButton, MessageCreateActionRow } = require("gcommands/src");
const config = require("../config.js");
const db = require('quick.db');
const random = require('random')


module.exports = {
    name: "messageCreate",
    async execute(messageCreate, client) {
        if (messageCreate.author.bot) return;
        if (!messageCreate.guild) return;
        // XP System
        user = messageCreate.author
        if (db.has(`exp_${messageCreate.guild.id}_${user.id}.xp`) == false) {
            db.set(`exp_${messageCreate.guild.id}_${user.id}`, { allxp: 0, xp: 0, level: 1})
        }
        let curlvl = await db.get(`exp_${messageCreate.guild.id}_${user.id}.level`);
        db.add(`exp_${messageCreate.guild.id}_${user.id}.xp`, random.int(5, 50))
        db.add(`exp_${messageCreate.guild.id}_${user.id}.allxp`, random.int(5, 50))
        if (db.get(`exp_${messageCreate.guild.id}_${user.id}.xp`) >= curlvl * 300) {
            db.subtract(`exp_${messageCreate.guild.id}_${user.id}.xp`, curlvl * 300);
            db.add(`exp_${messageCreate.guild.id}_${user.id}.level`, 1);
            const levelEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Level up!')
                .addFields(
                    { name: 'Current Level', value: `${curlvl}`, inline: true},
                    { name: 'New Level', value: `${curlvl + 1}`, inline: true},
                )
                .setTimestamp()

                messageCreate.channel.send({ embeds: levelEmbed});
        }
    }
}