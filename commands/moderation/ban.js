const Discord = require('discord.js');

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Ban anyone with one shot xD",
    usage: "ban <@user> <reason>",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
        }
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
        }

        if (!message.guild.members.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`);
        }
        let target = message.mentions.members.first();
        if(!target.bannable) {
            return message.channel.send("I cannot ban this user!")
        }
        let reason = args.slice(1).join(" ")
        if (!target) {
            return message.channel.send(`**${message.author.username}**, please mention the person who you want to ban`)
        }
        if (target.id === message.author.id) {
            return message.channel.send(`**${message.author.username}**, you can\'t kick yourself`)
        }
        if (!reason) reason = "No reason provided"
        let embed = new Discord.EmbedBuilder()
            .setTitle(`Ban Hammer`)
            .setDescription(`Banned ${target} (${target.id})`)
            .setColor("#ff2050")
            .setFooter(`Banned by ${message.author.username} for: ${reason}`)
        message.channel.send({ embeds: [embed] })

        target.ban(args[1]);
    }
}