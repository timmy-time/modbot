const config = require("../utils/config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "level",
    category: "xp",
    description: "",
    run: async (client, messageCreate, args, arguments) => {
        let target = messageCreate.mentions.users.first() || messageCreate.author
        let curlvl = (db.get(`${messageCreate.guild.id}_${messageCreate.author.id}_exp.level`)) // Current Level
        let curxp = (db.get(`${messageCreate.guild.id}_${messageCreate.author.id}_exp.xp`)) // Current Xp
        
        const levelEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('XP Level')
        .addFields(
            { name: 'Current Level', value: `${curlvl}` },
            { name: 'Current XP', value: `${curxp}/${curlvl * 300}` },
        )
        .setTimestamp()

        messageCreate.channel.send({ embeds: [levelEmbed]});
    }
}