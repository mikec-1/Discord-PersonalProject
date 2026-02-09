const Discord = require("discord.js")

module.exports = {
    name: "editsnipe",
    category: "fun",
    description: 'Shows the last edited message.',
    run: async (client, message, args) => {

        let snip = client.editsnipe.get(message.channel.id)

        if (!snip) return message.channel.send("No edits were found.")

        let embed = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Green)
            .setTitle("Message Edited")
            .setAuthor({ name: snip.user, iconURL: snip.profilephoto })
            .setDescription(`**Changes:**\n\`\`\`diff\n- ${snip.msg}\n+ ${snip.newMsg}\n\`\`\``)
            .setTimestamp(snip.date)
        if (snip.image) embed.setImage(snip.image)

        message.channel.send({ embeds: [embed] })
    }
}