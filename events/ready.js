const { stripIndents } = require("common-tags");
const config = require("../config.json");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`)============================================================]\n|\n| ${client.user.username} has launched successfully!\n|\n)============================================================]\n|\n| ${client.user.username} has successfully connected to DiscordAPI!\n|\n)============================================================]`)


    }
}