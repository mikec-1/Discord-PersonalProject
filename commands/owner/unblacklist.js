const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports = {
    name: "unblacklist",
    aliases: ["unbl"],
    usage: "unblacklist <@user>",
    description: "Unblacklist someone from the bot",
    run: async (client, message, args) => {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if (prefix === null) {
            prefix = config.default_prefix
        }
        if (!client.config.owners.includes(message.author.id)) return message.channel.send(`You don't have permission to use this command`)
        const user = message.mentions.users.first()
        if (!user) return message.channel.send('Please specify a person!')
        let unblacklist = await db.fetch(`blacklist_${user.id}`)
        db.delete(`blacklist_${user.id}`)
        let embed = new Discord.EmbedBuilder()
            .setDescription(`${user} has been unblacklisted from the bot!`)
        message.channel.send({ embeds: [embed] })
    }
}