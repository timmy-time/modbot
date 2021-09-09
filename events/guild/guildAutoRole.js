const config = require("../../config.json");
module.exports = (client, data) => {
    client.on('guildMemberAdd', member => {
        let role = message.guild.roles.cache.find(r => r.id === "837616945833574410");
        member.roles.add(role);
    });

}
