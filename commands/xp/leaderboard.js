const config = require("../../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "leaderboard",
    category: "xp",
    description: "",
    run: async (client, message, args, arguments) => {
        let firstplace = 0;
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
        message.channel.send(embed);
    }
}