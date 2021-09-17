const config = require("../../config.json");
const { Discord, MessageEmbed, RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping.",
    run: async (client, messageCreate, args) => {
        try {
            let ping = messageCreate.createdTimestamp - messageCreate.createdTimestamp
    
                const Embed = new MessageEmbed()
                .setDescription(`Checking the ping...\n${client.user.username} ➜ Command ran by ${messageCreate.author.username}`)
                .setColor('#4287f5');
                messageCreate.channel.send(Embed).then((embedmessageCreate) => {
                setTimeout(async () => {
                 Embed.setDescription(`PONG! Latency is ${ping}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms\n${client.user.username} ➜ Command ran by ${messageCreate.author.username}`)
                 await embedmessageCreate.delete().catch((error) => console.log(error));
                 messageCreate.channel.send(Embed);
                }, 2000);
            })
    

        }
        catch(err) {
          const failedEmbed = new MessageEmbed()
              .setTitle(`${wUser} could not be ${moderationDerivedType}.`)
              .addField(`Error`, err)
              .setFooter(`ModBot©2021`)
            messageCreate.channel.send(failedEmbed);
      }
            

    }
}