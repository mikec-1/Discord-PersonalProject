let Discord = require('discord.js');

module.exports = {
    name: "info",
    aliases: ["stats"],
    category: "fun",
    description: "Returns the number of servers and members the bot is watching",
    run: async (client, message, args) => {
        const user = message.author;
        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `Listening to ${client.guilds.cache.size} servers \nWatching ${client.users.cache.size} Users` })
            .setThumbnail(message.author.displayAvatarURL())
        message.channel.send({ embeds: [embed] })
    }
}