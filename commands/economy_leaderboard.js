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
        let money = db.all().filter(entry => entry.ID.startsWith(`eco_`)).sort((a, b) => a.data < b.data);
        console.log(money)
        let content = ""
            for (let i = 0; i < 1; i++) {
                try {
                    let user = await client.users.cache.get(money[i].ID.split('_')[1])
                    content = content + `${i+1}. ${user.username} ~ ${money[i].data.wallet}\n`
                    console.log(`Content: ${content}`)
                } catch(e) {
                    console.log(e)
                }
                
            }

            console.log(`Content: ${content}`)
        const embed = new MessageEmbed()
        .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
        .setColor("#FFFFFF")
        
        message.channel.send({embeds: embed})
        }
        
    
    }
