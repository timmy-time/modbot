const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const { readdirSync } = require("fs");
const logger = require("discordjs-logger"); // https://github.com/onepiecehung/discordjs-logger/blob/master/README.md
const db = require('quick.db');
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
["aliases", "commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));
client.categories = readdirSync("./commands/");
client.login(config.token);