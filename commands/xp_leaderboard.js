const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const random = require('random')
const config = require("../config.js")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "xpleaderboard",
            description: "Returns the user's xp level",

        });
    }

    async run({ client, respond, interaction, messageCreate, message}) { 
        
        /*let firstplace = 0;
        let firstplaceperson = "";
        let secondplace = 0;
        let secondplaceperson = "";
        let thirdplace = 0;
        let thirdplaceperson = "";
        const embed = new MessageEmbed()
        .setTitle("Leaderboard")
        .setColor("BLURPLE")
        .addField(`1. ${firstplaceperson}`, firstplace)
        .addField(`2. ${secondplaceperson}`, secondplace)
        .addField(`3. ${thirdplaceperson}`, thirdplace)
        message.channel.send({embeds: embed});
        */

    }
}