const config = require("../utils/config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "shutdown",
    category: "owner",
    description: "",
    run: async (client, messageCreate, args, arguments) => {
        if (messageCreate.author.id != config.ownerid) {
            messageCreate.channel.send('You are missing permission to use this command.') 
        } else {
            try {
                messageCreate.channel.send('Shutting down.')
                client.destroy();
            }
            catch(err) {
                console.log(err)
            }

        }
    }
}