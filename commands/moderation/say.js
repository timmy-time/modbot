const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { promptmessageCreate } = require("../../functions.js");
module.exports = {
    name: "say",
    category: "moderation",
    description: "Copys the users output and prints it in the bot",
    run: async (client, messageCreate, args) => {
        messageCreate.delete();

        if (!messageCreate.member.hasPermission("MANAGE_messageCreateS"))
            return messageCreate.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        if (args.length < 0)
            return messageCreate.reply("Nothing to say?").then(m => m.delete(5000));


        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor("#0099ff");

            messageCreate.channel.send(embed);
        } else {
            messageCreate.channel.send(args.join(" "));
        }
    }
}