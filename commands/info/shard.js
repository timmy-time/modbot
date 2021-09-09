const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const os = require("os");
module.exports = {
    name: "shard",
    category: "info",
    description: "Lists the current shards",
    run: async (client, message, args) => {    
        try {
            let maxshards = 5;   
            let subscriptionstatus = false;
            let alwaysplayingstatus = false;
            let nodenum = os.hostname();
            message.channel.send("**__Generic__**\n- Server ID ``" + message.guild.id + "``\n- Shard: ``[" + message.guild.shardID +  " / " + maxshards + "]``\n- Node ``" + nodenum + "``\n- API Latency ``" + Math.round(client.ws.ping) + "ms``\n- Server Region ``sydney``\n**__Premium__**\n- Subscription ``" + subscriptionstatus + "``\n- Always Playing ``" + alwaysplayingstatus + "``")
                    
            }
            catch(err) {
                const failedEmbed = new MessageEmbed()
                    .setTitle(`Command could not be ran.`)
                    .addField(`Error:`, err)
                    .setFooter(`ModBot©2021`)
                message.channel.send(failedEmbed);
            }
        }
    }
    