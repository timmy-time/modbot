const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
const config = require("../config.js")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ping",
            description: "Returns latency and API ping.",

        });
    }

    async run({ client, respond, interaction, messageCreate, message}) { 
        let ping = message.createdTimestamp - message.createdTimestamp
        const Embed = new MessageEmbed()
        .setDescription(`Latency is ${ping}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms\n${client.user.username} ➜ Command ran by ${message.author.username}`)
        .setColor('#4287f5');
        message.channel.send({embeds: Embed})
    }
}