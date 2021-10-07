const { Client, Intents } = require("discord.js")
const { GCommands } = require("gcommands")
const config = require("./config.js")
const path = require('path')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on("ready", () => {
    const gc = new GCommands(client, {
        cmdDir: path.join(__dirname, "commands"),
        eventDir: path.join(__dirname, "events"),
        language: "english",
        unkownCommandMessage: false,
        commands: {
            slash: 'both',
            prefix: config.prefix
        },
        /* DB SUPPORT
         * redis://user:pass@localhost:6379
         * mongodb://user:pass@localhost:27017/dbname
         * sqlite://path/to/database.sqlite
         * postgresql://user:pass@localhost:5432/dbname
         * mysql://user:pass@localhost:3306/dbname
        */
    })

    gc.on("debug", (debug)=>{console.log(debug)})
    gc.on("log", (log)=>{console.log(log)})
})


client.login(config.token);