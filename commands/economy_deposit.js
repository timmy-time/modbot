const { Discord, MessageEmbed, RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
const { Command } = require("gcommands");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "deposit",
            description: "Returns the economy balance of the user.",
            cooldown: "5s",
        });
    }

    async run({ client, respond, interaction, messageCreate, message }) { 
        const args = message.content.startsWith(config.defaultprefix) ? message.content.slice(config.defaultprefix.length).trim().split(/ +/g) : message.content.replace(/[^\s]*/, "").trim().split(/ +/g); 
        let target = message.author;

        let member = db.fetch(`eco_${target.id}.wallet`)
        let bank = db.fetch(`eco_${target.id}.curbankamt`)

        if (args[0] == 'all') {
            let money = await db.fetch(`eco_${target.id}.wallet`)
            let bank = await db.fetch(`eco_${target.id}.curbankamt`)
            let maxbank = await db.fetch(`eco_${target.id}.maxbank`)
            if (money > maxbank-bank) {
                let embedbank = new MessageEmbed()
                .setColor('#FFFFFF')
                .setDescription(`:negative_squared_cross_mark:  You don't have enough storage to deposit, You can deposit ${maxbank-bank} more`)
                message.channel.send(embedbank)

            } else {

            let embedbank = new MessageEmbed()
            .setColor('#FFFFFF')
            .setDescription(":negative_squared_cross_mark:  You don't have any money to deposit")

            if(money === 0) return message.channel.send(embedbank)

            db.add(`eco_${target.id}.curbankamt`, money)
            db.subtract(`eco_${target.id}.wallet`, money)
            let embed5 = new MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`:white_check_mark:  You have deposited all your coins into your bank`);
            message.channel.send(embed5)
            }
        
        } else {
        
        let embed2 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:negative_squared_cross_mark:  Specify an amount to deposit`);
        
        if (!args[0]) {
            return message.channel.send(embed2)
            .catch(err => console.log(err))
        }
        let embed3 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:negative_squared_cross_mark:  You can't deposit negative money`);

        if (message.content.includes('-')) { 
            return message.channel.send(embed3)
        }
        let embed4 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:negative_squared_cross_mark:  You don't have that much money`);

        if (member < args[0]) {
            return message.channel.send(embed4)
        }
        let money = await db.fetch(`eco_${target.id}.wallet`)
        let bank = await db.fetch(`eco_${target.id}.curbankamt`)
        let maxbank = await db.fetch(`eco_${target.id}.maxbank`)
        console.log(money)
        console.log(bank)
        console.log(maxbank)
        if (args[0] > (maxbank-bank)) {
            let embedbank = new MessageEmbed()
            .setColor('#FFFFFF')
            .setDescription(`:negative_squared_cross_mark:  You don't have enough storage to deposit, You can only deposit ${maxbank-bank}`)
            message.channel.send(embedbank)

        } else {

        let embed5 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark:  You have deposited ${args[0]} coins into your bank`);

        message.channel.send(embed5)
        db.add(`eco_${target.id}.curbankamt`, args[0])
        db.subtract(`eco_${target.id}.wallet`, args[0])
        }
        }
    }
}