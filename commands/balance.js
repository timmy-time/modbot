const config = require("../config.json");
const { Discord, MessageEmbed, RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db


module.exports = {
    name: "balance",
    category: "currency",
    description: "Returns the balance",
    run: async (client, message, args) => {
        try {
            const target = message.mentions.users.first() || message.author
            if (db.has(`myUserBalance.${target.id}.wallet`) == false) { 
                db.set(`myUserBalance.${target.id}`, { userid: `${target.id}`, wallet: 0, minbank: 0, maxbank: 1000,curbankamt: 0, items: []})
            }
            const balanceEmbed = new MessageEmbed()
                .setTitle(`${target.username}'s Balance`)
                .addField(`Wallet`, `⏣${db.get(`myUserBalance.${target.id}.wallet`)}`)
                .addField(`Bank`, `⏣${db.get(`myUserBalance.${target.id}.curbankamt`)}` + "/" + db.get(`myUserBalance.${target.id}.maxbank`) + " ``(" + "" + "%)``")
                .setFooter(`ModBot©2021`)
            message.channel.send(balanceEmbed);

        }
        catch(err) {
          const failedEmbed = new MessageEmbed()
                .addField(`Error`, err)
                .setFooter(`ModBot©2021`)
            message.channel.send(failedEmbed);
            console.log(err)
      }
            

    }
}