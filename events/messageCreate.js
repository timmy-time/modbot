const { del } = require("../functions.js");
const config = require("../config.json");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db
let XPCONSOLELOG = 'true';
const random = require('random')

module.exports = {
    name: 'messageCreate',
    execute: async (messageCreate, client) => {
        console.log("a")
        if (messageCreate.author.bot) return;
        if (!messageCreate.guild) return;
        
        //if (db.has('guild.prefix') == false) {
        //    db.set(`guild.prefix`, { prefix: config.defaultprefix})
        //}

        // XP System
        if (db.has(`${messageCreate.guild.id}_${messageCreate.author.id}_exp.xp`) == false) {
            db.set(`${messageCreate.guild.id}_${messageCreate.author.id}_exp`, { xp: 0, level: 1})
        }
    
        let curlvl = await db.get(`${messageCreate.guild.id}_${messageCreate.author.id}_exp.level`);

        db.add(`${messageCreate.guild.id}_${messageCreate.author.id}_exp.xp`, random.int(5, 50))

        if (db.get(`${messageCreate.guild.id}_${messageCreate.author.id}_exp.xp`) >= curlvl * 300) {
            db.subtract(`${messageCreate.guild.id}_${messageCreate.author.id}_exp.xp`, curlvl * 300);
            db.add(`${messageCreate.guild.id}_${messageCreate.author.id}_exp.level`, 1);
        }
        if (messageCreate.content === `${config.defaultprefix}`) return;
        if (!messageCreate.content.startsWith(config.defaultprefix) && !messageCreate.content.replace(/\D/g, "")) return;
        
        if (!messageCreate.member) messageCreate.member = await messageCreate.guild.fetchMember(messageCreate).catch(err => err);
        const args = messageCreate.content.startsWith(config.defaultprefix) ? messageCreate.content.slice(config.defaultprefix.length).trim().split(/ +/g) : messageCreate.content.replace(/[^\s]*/, "").trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));

        if (command) {
            del(messageCreate, 0);
            command.run(client, messageCreate, args);
        }
    }
    }
