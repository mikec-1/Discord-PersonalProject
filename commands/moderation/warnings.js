const db = require('quick.db')
const {
    EmbedBuilder
} = require("discord.js")
let embed = new EmbedBuilder()
    .setColor(Math.floor(Math.random() * 16777215))
module.exports = {
    name: "warnings",
    description: "Check how many warnings you or someone else has",
    aliases: ["warns"],
    category: "moderation",
    run: (client, message, args) => {
        const user = message.mentions.members.first() || message.author

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
        if (warnings === null) warnings = 0;
        embed.setAuthor({ name: `Number of Warnings` })
        embed.setDescription(`${user} has **${warnings} warnings**!`)
        message.channel.send({ embeds: [embed] })
    }
}