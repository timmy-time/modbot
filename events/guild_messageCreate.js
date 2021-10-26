const { MessageEmbed, Message, MessageAttachment } = require("discord.js");
const config = require("../config.js");
const db = require('quick.db');
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }


module.exports = {
    name: "messageCreate",
    once: false,
	async execute(messageCreate, message, client) {
        if (message.author.bot) return;
        if (!message.guild) return;
        // XP System
        user = messageCreate.author
        if (db.has(`exp_${messageCreate.guild.id}_${user.id}.xp`) == false) {
            db.set(`exp_${messageCreate.guild.id}_${user.id}`, { allxp: 0, xp: 0, level: 1})
        }
        let curlvl = await db.get(`exp_${messageCreate.guild.id}_${user.id}.level`);
        db.add(`exp_${messageCreate.guild.id}_${user.id}.xp`, getRandomIntInclusive(5, 50))
        db.add(`exp_${messageCreate.guild.id}_${user.id}.allxp`, getRandomIntInclusive(5, 50))
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