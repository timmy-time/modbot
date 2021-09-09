const config = require("../../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "xpadd",
    category: "xp",
    description: "",
    run: async (client, message, args) => {
        try {
            if (message.author.id != config.ownerid) return message.channel.send("You need to be the server owner to run this command.")
            
            if (args[0] >= 10000) {
                message.channel.send("This process isn't possible complete due to being over 10,000.")
            } else {
                let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])    
                let curlvl = (db.get(`xp.${message.guild.id}.${target.id}.level`)) // Current Level
                let curxp = (db.get(`xp.${message.guild.id}.${target.id}.xp`)) // Current Xp
                db.add(`xp.${message.guild.id}.${target.id}.xp`, args[0])
                if (args[0] > curlvl * 30000) return message.channel.send("This process might take a while. We will produce the output once it has completed.")
                while (db.get(`xp.${message.guild.id}.${target.id}.xp`) >= curlvl * 300) {
                    db.subtract(`xp.${message.guild.id}.${target.id}.xp`, curlvl * 300);
                    db.add(`xp.${message.guild.id}.${target.id}.level`, 1);
                    message.channel.send("Processed a new level from the xpadd commmand.")
                }
                
                let newlvl = (db.get(`xp.${message.guild.id}.${target.id}.level`)) // Current Level
                let newxp = (db.get(`xp.${message.guild.id}.${target.id}.xp`)) // Current Xp
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
    
                message.channel.send(levelEmbed);

            }
        }
        catch(err) {
            console.log(err)
        }
    }
}