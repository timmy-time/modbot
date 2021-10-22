const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ecoleaderboard",
            description: "Returns the economy balance of the user.",
            cooldown: "1s",
        });
    }
    async run({ client, respond, interaction, messageCreate, message }, args) {  
        let content = "";
        let money = db.all().filter(data => data.ID.startsWith(`eco_`)).sort((a, b) => b.data - a.data)
        money.length = 10;
        try {
            for (var i in money) {
                content += `**${money.indexOf(money[i])+1}.**     <@${money[i].ID.slice(4)}> - \`${money[i].data.totalbal} Coins\`\n`;
            }
        } catch(e) {
            console.log(e)
        }
        console.log(`Content: ${content}`)
        const embed = new MessageEmbed()
        .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
        .setColor("#FFFFFF")
        message.channel.send({embeds: embed})
        }
        
    
    }
