const config = require("../config.json");
const { MessageEmbed, RichEmbed, Message } = require("discord.js");
const { promptMessage, successEmbed } = require("../functions.js");
const fs = require("fs");
module.exports = {
    commands: ["reboot", "restart"],
    expectedArgs: '',
    permissions: [],
    requiredRoles: [],
    permissionError: 'You need to be the bot author to run this command.',
    minArgs: 0,
    maxArgs: 0,

    callback: (messageCreate, arguments, text) => {
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
    }
}