const Discord = require('discord.js')
module.exports = {
    name: 'snipe',
    category: 'fun',
    description: 'Snipes a deleted message',
    run: async (client, message, args) => {
        const msg = client.snipes.get(message.channel.id)
        if (!msg) return message.channel.send("There is nothing to snipe!")
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: msg.author, iconURL: msg.profilephoto })
            .setDescription(msg.content)
            .setTimestamp(msg.date)
        if (msg.image) embed.setImage(msg.image)
        message.channel.send({ embeds: [embed] })
    }
}