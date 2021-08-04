const { MessageEmbed, RichEmbed, Message } = require("discord.js");
module.exports = {
    del: async function (message, timeout) {
        if (message) { //Fix in case bad message
            if (message.id) { //Fix cannot read ID 
                if (message.deletable) {
                    setTimeout(function () {
                        if (!message.reactions.cache.get('🛑')) {  //messages can now stop from being deleted
                            message.delete({ timeout: 0 }).catch(err => err) //This gets rid of the annoying "Unknown Message" error.
                        }
                    }, timeout);
                }
            } else return;
        } else return;
    },
    promptMessage: async function (message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },
}