const { MessageEmbed, Message, MessageAttachment } = require("discord.js");
const config = require("../config.js");
const db = require('quick.db');
const random = require('random')


module.exports = {
    name: "messageCreate",
    once: false,
	async execute(messageCreate, message, client) {
        if (message.author.bot) return;
        if (!message.guild) return;
        console.log("f")
        // XP System
        if (db.has(`${message.guild.id}_${message.author.id}_exp.xp`) == false) {
            db.set(`${message.guild.id}_${message.author.id}_exp`, { xp: 0, level: 1, allxp: 0})
        }
        let curlvl = await db.get(`${message.guild.id}_${message.author.id}_exp.level`);
        db.add(`${message.guild.id}_${message.author.id}_exp.xp`, random.int(5, 50))
        db.add(`${message.guild.id}_${message.author.id}_exp.allxp`, random.int(5, 50))
        if (db.get(`${message.guild.id}_${message.author.id}_exp.xp`) >= curlvl * 300) {
            db.subtract(`${message.guild.id}_${message.author.id}_exp.xp`, curlvl * 300);
            db.add(`${message.guild.id}_${message.author.id}_exp.level`, 1);
            const levelEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Level up!')
                .addFields(
                    { name: 'Current Level', value: `${curlvl}`, inline: true},
                    { name: 'New Level', value: `${curlvl + 1}`, inline: true},
                )
                .setTimestamp()

                message.channel.send({ embeds: levelEmbed});
        }
    }
}