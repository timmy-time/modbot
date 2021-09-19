const { Discord, MessageEmbed, RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
const { Command } = require("gcommands");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "balance",
            description: "Returns the economy balance of the user.",
            cooldown: "5s",
        });
    }

    async run({ client, respond, interaction, messageCreate, message }, args) {  
        const target = message.author || message.mentions.users.first()
        if (db.has(`${target.id}_eco.wallet`) == false) { 
            db.set(`${target.id}_eco`, { userid: `${target.id}`, wallet: 0, minbank: 0, maxbank: 1000,curbankamt: 0, items: []})
        }
        const balanceEmbed = new MessageEmbed()
            .setTitle(`${target.username}'s Balance`)
            .addField(`Wallet`, `⏣${db.get(`${target.id}_eco.wallet`)}`)
            .addField(`Bank`, `⏣${db.get(`${target.id}_eco.curbankamt`)}` + "/" + db.get(`${target.id}_eco.maxbank`) + " ``(" + "" + "%)``")
            .setFooter(`ModBot©2021`)
        message.channel.send({ embeds: balanceEmbed});
    }
}