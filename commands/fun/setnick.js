const Discord = require("discord.js");
module.exports = {
    name: "setnickname",
    aliases: ["setnick", "nick", "nickname"],
    category: "info",
    description: "Changes the nickname of the person mentioned",
    run: async (client, message, args) => {
        const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

        if (!message.member.permissions.has([PermissionFlagsBits.ManageGuild, PermissionFlagsBits.Administrator])) {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription("You can't use this command!");
            return message.channel.send({ embeds: [embed] });
        }

        let member = message.mentions.members.first();
        if (!member) {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription("You need to mention the user!");
            return message.channel.send({ embeds: [embed] });
        }

        let nick = args.slice(1).join(" ");
        if (!nick) {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription("You need to input the nickname!");
            return message.channel.send({ embeds: [embed] });
        }

        if (nick.toLowerCase() === "reset") {
            try {
                await member.setNickname(null);
                const embed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setDescription(`Successfully reset **${member.user.tag}**'s nickname!`);
                return message.channel.send({ embeds: [embed] });
            } catch (err) {
                const embed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setDescription(`Error: ${err.message}`);
                return message.channel.send({ embeds: [embed] });
            }
        }

        try {
            await member.setNickname(nick);
            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setDescription(`Successfully changed **${member.user.tag}** nickname to **${nick}**`);
            return message.channel.send({ embeds: [embed] });
        } catch (err) {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(`Error: ${err.message}`);
            return message.channel.send({ embeds: [embed] });
        }
    }
}