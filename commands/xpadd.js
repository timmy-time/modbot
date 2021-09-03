const config = require("../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "xpadd",
    category: "xp",
    description: "",
    run: async (client, messageCreate, args) => {
        try {
            if (messageCreate.author.id != config.ownerid) return messageCreate.channel.send("You need to be the server owner to run this command.")
            
            if (args[0] >= 10000) {
                messageCreate.channel.send("This process isn't possible complete due to being over 10,000.")
            } else {
                let target = messageCreate.guild.member(messageCreate.mentions.users.first()) || messageCreate.guild.members.get(args[0])    
                let curlvl = (db.get(`${messageCreate.guild.id}_${target.id}_exp.level`)) // Current Level
                let curxp = (db.get(`${messageCreate.guild.id}_${target.id}_exp.xp`)) // Current Xp
                db.add(`${messageCreate.guild.id}_${target.id}_exp.xp`, args[0])
                if (args[0] > curlvl * 30000) return messageCreate.channel.send("This process might take a while. We will produce the output once it has completed.")
                while (db.get(`${messageCreate.guild.id}_${target.id}_exp.xp`) >= curlvl * 300) {
                    db.subtract(`${messageCreate.guild.id}_${target.id}_exp.xp`, curlvl * 300);
                    db.add(`${messageCreate.guild.id}_${target.id}_exp.level`, 1);
                    messageCreate.channel.send("Processed a new level from the xpadd commmand.")
                }
                
                let newlvl = (db.get(`${messageCreate.guild.id}_${target.id}_exp.level`)) // Current Level
                let newxp = (db.get(`${messageCreate.guild.id}_${target.id}_exp.xp`)) // Current Xp
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
    
                messageCreate.channel.send({ embeds: [levelEmbed]});

            }
        }
        catch(err) {
            console.log(err)
        }
    }
}