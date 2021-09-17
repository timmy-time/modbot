const config = require("../../config.json");
const { MessageEmbed, RichEmbed, messageCreate } = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "clearhistory",
    category: "moderation",
    description: "Lists the history of the user provided.",
    run: async (client, messageCreate, args, arguments) => {
        if (!messageCreate.author.id == config.ownerid) return;
        let wUser = messageCreate.mentions.users.first() || messageCreate.author
        db.set(`myUserWarns.${wUser.id}.${messageCreate.guild.id}`, { userid: `${wUser.id}`, guild: `${messageCreate.guild.id}`, warns: 0, reasons: []})
        messageCreate.channel.send("Cleared History.")
    }
}