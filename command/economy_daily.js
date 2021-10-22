const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "daily",
            description: "Returns the economy balance of the user.",
            cooldown: "1d",
        });
    }

    async run({ client, respond, interaction, messageCreate, message }, args) {  
        const target = message.author
        if (db.has(`eco_${target.id}.wallet`) == false) { 
            db.set(`eco_${target.id}`, { userid: `${target.id}`, totalbal: 0, wallet: 0, minbank: 0, maxbank: 1000,curbankamt: 0, daily: 0, items: []})
        }

        let amount = 500;

            //let timeEmbed = new MessageEmbed()
            //.setColor("#FFFFFF")
            //.setDescription(`<:Cross:618736602901905418> You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            //message.channel.send({embeds: timeEmbed})
        let moneyEmbed = new MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`:white_check_mark: You've collected your daily reward of ${amount} coins`);
        message.channel.send({embeds: moneyEmbed})
        db.add(`eco_${target.id}.wallet`, amount)
        db.add(`eco_${target.id}.totalbal`, amount)


        }
}