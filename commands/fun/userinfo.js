const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
    name: "userinfo",
    category: "fun",
    description: "Shows you all of the information about a specified user",
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || message.author;

        let userinfo = {};
        let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .filter((role) => role.name !== "muted" && role.name !== "@everyone")
            .map(r => r)
            .join(" ");

        const member = message.guild.members.cache.get(user.id);

        userinfo.avatar = user.displayAvatarURL();
        userinfo.name = user.username;
        userinfo.discrim = `#${user.discriminator}`;
        userinfo.id = user.id;
        userinfo.status = member?.presence?.status || "offline";
        userinfo.registered = moment.utc(user.createdAt).format("dddd, MMMM do, YYYY");
        userinfo.joined = member ? moment.utc(member.joinedAt).format("dddd, MMMM do, YYYY") : "Unknown";
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: userinfo.avatar })
            .setThumbnail(userinfo.avatar)
            .addFields({ name: 'Username: ', value: userinfo.name, inline: true })
            .addFields({ name: 'Discriminator: ', value: userinfo.discrim, inline: true })
            .addFields({ name: 'ID: ', value: userinfo.id, inline: true })
            .addFields({ name: 'Status: ', value: userinfo.status, inline: true })
            .addFields({ name: "Registered: ", value: userinfo.registered, inline: true })
            .addFields({ name: 'Joined: ', value: userinfo.joined, inline: true })
            .addFields({ name: 'Roles: ', value: rolemap, inline: true })
        message.channel.send({ embeds: [embed] })
    }
}