const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "bans",
    description: "Tells you the number of people that were banned from the server, in which you are running the command",
    category: "extra",
    run: async (client, message, args) => {

        message.guild.fetchBans().then(bans => {
            message.channel.send(`${bans.size} people are banned from this server.`)
        })

    }
}