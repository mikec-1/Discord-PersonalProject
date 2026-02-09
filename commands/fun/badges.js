const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'badges',
    description: "See what badges a user has",
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();
        if(!flags.join()) return message.channel.send("This user doesn't have any badges!")

        console.log(flags);
        
        message.channel.send(`${user}'s badges: ${flags.join(', ').toLowerCase()}`)
    }
}