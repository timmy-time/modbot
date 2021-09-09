const config = require("../../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "shutdown",
    category: "owner",
    description: "",
    run: async (client, message, args, arguments) => {
        if (message.author.id != config.ownerid) {
            message.channel.send('You are missing permission to use this command.') 
        } else {
            try {
                message.channel.send('Shutting down.')
                client.destroy();
            }
            catch(err) {
                console.log(err)
            }

        }
    }
}