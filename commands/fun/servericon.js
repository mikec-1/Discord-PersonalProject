const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'servericon',
    aliases: ["icon", "server"],
    description: "Sends the icon of the server in which the command is run in",
    run: async(client, message, args) => {
        const Embed = new EmbedBuilder()
        .setTitle(`${message.guild.name}`)
        .setImage(message.guild.iconURL({ dynamic: true, size:2048}))
        message.channel.send({ embeds: [Embed] })

    }
}