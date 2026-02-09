const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: "unmute",
    category: "moderation",
    description: "Unmutes someone",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("You do not have permission to unmute anyone!");
        }

        if (!message.guild.members.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("I do not have permission to manage roles.");
        }

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
        }
        const user = message.mentions.members.first();

        if (!user) {
            return message.channel.send(
                "Please mention the member to who you want to unmute"
            );
        }
        let muterole = message.guild.roles.cache.find(x => x.name === "Muted")


        if (user.roles.cache.has(muterole)) {
            return message.channel.send("Given User do not have mute role so what i am suppose to take")
        }
        user.roles.remove(muterole)

        await message.channel.send(`**${message.mentions.users.first().username}** has been unmuted`)

        user.send(`You have been unmuted from **${message.guild.name}**`)

    }
}