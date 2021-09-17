const config = require("../../config.json");
const { MessageEmbed, RichEmbed, messageCreate } = require("discord.js");
const { promptmessageCreate, successEmbed } = require("../../functions.js");
const fs = require("fs");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
module.exports = {
    name: "reboot",
    category: "owner",
    description: "",
    run: async (client, messageCreate, args, arguments) => {
        /*
        if (!messageCreate.author.id == config.ownerid) return;
        try {
            client.destroy().then(() => {
                messageCreate.channel.send('Rebooting...')
                client.login(config.token)
            })
        }
        catch(err) {
            console.log(err)
        }
        */
    }
}