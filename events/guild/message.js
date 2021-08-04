const { del } = require("../../functions.js");
const config = require("../../config.json");
const db = require('quick.db');//https://www.npmjs.com/package/quick.db


module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    
    //if (db.has('guild.prefix') == false) {
    //    db.set(`guild.prefix`, { prefix: config.defaultprefix})
    //}

    // XP System
    if (db.has(`xp.${message.guild.id}.${message.author.id}.xp`) == false) {
        db.set(`xp.${message.guild.id}.${message.author.id}`, { xp: 0, level: 1})
        console.log(`New XP Data set to user.`)
    }
  
    let curlvl = await db.get(`xp.${message.guild.id}.${message.author.id}.level`);
    console.log(db.get(`xp.${message.guild.id}.${message.author.id}.level`)) // Current Level
    console.log(db.get(`xp.${message.guild.id}.${message.author.id}.xp`)) // Current Xp
  
    db.add(`xp.${message.guild.id}.${message.author.id}.xp`, 1)
    console.log(`Added 1 xp to ${message.author.id} at ${message.guild.id}`)    
  
    if (db.get(`xp.${message.guild.id}.${message.author.id}.xp`) > curlvl * 300) {
        db.subtract(`xp.${message.guild.id}.${message.author.id}.xp`, curlvl * 300);
        db.add(`xp.${message.guild.id}.${message.author.id}.level`, 1);
        console.log(db.get(`xp.${message.guild.id}.${message.author.id}.level`)) // Current Level
        console.log(db.get(`xp.${message.guild.id}.${message.author.id}.xp`)) // Current Xp
    }
    if (message.content === `${config.defaultprefix}`) return;
    if (!message.content.startsWith(config.defaultprefix) && !message.content.replace(/\D/g, "").startsWith(`${client.user.id}`)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message).catch(err => err);
    const args = message.content.startsWith(config.defaultprefix) ? message.content.slice(config.defaultprefix.length).trim().split(/ +/g) : message.content.replace(/[^\s]*/, "").trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        del(message, 0);
        command.run(client, message, args);
    }
}