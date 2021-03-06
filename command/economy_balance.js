const { Discord, MessageEmbed, RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require('quick.db');
const { Command } = require("gcommands");
module.exports = class extends Command {
    constructor(client) {
      super(client, {
            name: "balance",
            description: "Returns the economy balance of the user.",
            cooldown: "5s",
            slash: true
        });
    }

    async run({ client, respond, interaction, messageCreate, message }, args) {  
        const target = message.mentions.users.first() || message.author 
        if (db.has(`eco_${target.id}.wallet`) == false) { 
            db.set(`eco_${target.id}`, { userid: `${target.id}`, totalbal: 0, wallet: 0, minbank: 0, maxbank: 1000, curbankamt: 0, daily: 0, items: []})
        }
        let bankamt = db.fetch(`eco_${target.id}.curbankamt`) / db.get(`${target.id}_eco.maxbank`)
        let curbankamt = db.fetch(`eco_${target.id}.curbankamt`)
        let maxbank = db.get(`eco_${target.id}.maxbank`)
        if (curbankamt >= maxbank) {
            bankamt = 100
        } else {
            if (bankamt == "Infinity") {
                bankamt = 0
            }
        
            if (isNaN(bankamt)) {
                bankamt = 0
            }
        }
        respond({ 
            ephemeral: false,
            embeds: new MessageEmbed()
            .setTitle(`${target.username}'s Balance`)
            .setTitle(`${target.username}'s Balance`)
            .addField(`Wallet`, `⏣${db.get(`eco_${target.id}.wallet`)}`)
            .addField(`Bank`, `⏣${db.fetch(`eco_${target.id}.curbankamt`)}` + "/" + db.get(`eco_${target.id}.maxbank`) + " ``(" + bankamt + "%)``")
            .setFooter(config.footer)
        })
    }
}