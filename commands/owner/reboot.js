const config = require("../../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "reboot",
    category: "owner",
    description: "",
    run: async (client, message, args, arguments) => {
        /*
        if (!message.author.id == config.ownerid) return;
        try {
            client.destroy().then(() => {
                message.channel.send('Rebooting...')
                client.login(config.token)
            })
        }
        catch(err) {
            console.log(err)
        }
        */
    }
}