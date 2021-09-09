const config = require("../../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "clearhistory",
    category: "moderation",
    description: "Lists the history of the user provided.",
    run: async (client, message, args, arguments) => {
        if (!message.author.id == config.ownerid) return;
        let wUser = message.mentions.users.first() || message.author
        db.set(`myUserWarns.${wUser.id}.${message.guild.id}`, { userid: `${wUser.id}`, guild: `${message.guild.id}`, warns: 0, reasons: []})
        message.channel.send("Cleared History.")
    }
}