const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "beg",
            description: "Returns the economy balance of the user.",
            cooldown: "15m",
        });
    }

    async run({ client, respond, interaction, messageCreate, message }, args) {  
        if (db.has(`${message.author.id}_eco.wallet`) == false) { 
            db.set(`${message.author.id}_eco`, { userid: `${message.author.id}`, wallet: 0, minbank: 0, maxbank: 1000,curbankamt: 0, items: []})
        }
        let randint = random.int(0, 10)
        if (randint == 1) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed }); 
        } else if (randint == 2) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed }); 
        } else if (randint == 3) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed }); 
        } else if (randint == 4) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed });                     
        } else if (randint == 5) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed }); 
        } else if (randint == 6) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed }); 
        } else if (randint == 7) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed }); 
        } else if (randint == 8) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed }); 
        } else if (randint == 9) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed()
                .setTitle(message.author.username)
                .addField(`Beg`, `A nice man gave you ⏣${rint}`)
                .setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed }); 
        } else if (randint == 10) {
            let rint = random.int(0, 250)
            db.add(`${message.author.id}_eco.wallet`, rint)
            const begEmbed = new MessageEmbed().setTitle(message.author.username).addField(`Beg`, `Haha poor boy, go get a job.`).setFooter(`ModBot©2021`)
            message.channel.send({ embeds: begEmbed });        
        }

    }
}