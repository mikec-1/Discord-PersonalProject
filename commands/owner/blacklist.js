const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports = {
    name: "blacklist",
    aliases: ["bl"],
    usage: "blacklist <@user>",
    description: "Blacklist someone from the bot",
    run: async (client, message, args) => {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if (prefix === null) {
            prefix = config.default_prefix
        }
        if (!client.config.owners.includes(message.author.id)) return message.channel.send(`You don't have permission to use this command`)
        const user = message.mentions.users.first()
        if (!user) return message.channel.send('Please specify a person!')
        let blacklist = await db.fetch(`blacklist_${user.id}`)
        if (blacklist === "Not") {
            db.set(`blacklist_${user.id}`, 'Blacklisted')
            let embed = new Discord.EmbedBuilder()
                .setDescription(`${user} has been blacklisted from the bot!`);
            message.channel.send({ embeds: [embed] })
        } else if (blacklist = "Blacklisted") {
            db.set(`blacklist_${user.id}`, 'Blacklisted')
            let embed2 = new Discord.EmbedBuilder()
                .setDescription(`${user} has been blacklisted from the bot!`);
            message.channel.send({ embeds: [embed2] })
        } else {
            db.set(`blacklist_${user.id}`, 'Not')
            let embed3 = new Discord.EmbedBuilder()
                .setDescription(`Set up data for ${user}`);
            message.channel.send({ embeds: [embed3] })
        }
    }
}