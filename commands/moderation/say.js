const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
module.exports = {
    name: "say",
    category: "moderation",
    description: "Copys the users output and prints it in the bot",
    run: async (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));


        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor("#0099ff");

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}