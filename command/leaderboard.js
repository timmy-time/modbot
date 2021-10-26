const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../config.js")
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "leaderboard",
            description: "Returns the user's xp level",
            slash: false,
            aliases: ["lb"],
        });
    }

    async run({ client, respond, interaction, messageCreate, message}) { 
        
    }
}