const config = require("../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "warn",
    aliases: ["warns"],
    category: "moderation",
    description: "",
    run: async (client, messageCreate, args, arguments) => {
      let moderationType = "Warn"
      let moderationDerivedType = "Warned"
      try {
        if(!messageCreate.member.hasPermission("MANAGE_MESSAGES")) return messageCreate.reply(`You are missing permission of "MANAGE_MESSAGES" permissions.`);
        let wUser = messageCreate.mentions.users.first()
        if(!wUser) return messageCreate.reply("Couldn't find the user.") ;
        //if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot warn another Moderator");
        let reason = args.join(" ").slice(22);
        if(!reason) reason = 'Unspecified';
          if (db.has(`myUserWarns.${wUser.id}.${messageCreate.guild.id}.warns`) == false) {
            db.set(`myUserWarns.${wUser.id}.${messageCreatee.guild.id}`, { userid: `${wUser.id}`, guild: `${messageCreate.guild.id}`, warns: 0, reasons: []})
          }
          db.add(`myUserWarns.${wUser.id}.${messageCreate.guild.id}.warns`, 1)
          db.push(`myUserWarns.${wUser.id}.${messageCreate.guild.id}.reasons`, reason)
        
          const successEmbed = new MessageEmbed()
          .setTitle('Moderation Log')
          .addField(moderationDerivedType, `${wUser}`)
          .addField(`Banned By`, messageCreate.author.username)
          .addField(`Reason`,`${reason}`)
          .setFooter(`ModBot©2021`)
          messageCreate.channel.send({ embeds: [successEmbed]});
      }
      catch(err) {
        const failedEmbed = new MessageEmbed()
            .setTitle(`The user could not be ${moderationDerivedType}.`)
            .addField(`Error`, err)
            .setFooter(`ModBot©2021`)
            messageCreate.channel.send({ embeds: [failedEmbed]});
    }
} 
}