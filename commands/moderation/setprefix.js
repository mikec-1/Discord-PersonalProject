const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setprefix",
    aliases: ["prefix", "sp"],
    category: "moderation",
    description: "Sets a custom prefix for the server",
    usage: "<new_prefix>",
    run: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.channel.send("You need `Administrator` permission to change the prefix!");
        }

        const newPrefix = args[0];

        if (!newPrefix) {
            return message.channel.send("Please provide a new prefix!");
        }

        if (newPrefix.length > 5) {
            return message.channel.send("The prefix cannot be longer than 5 characters!");
        }

        // Save the new prefix to the database
        db.set(`prefix_${message.guild.id}`, newPrefix);

        const embed = new EmbedBuilder()
            .setColor(0x00FF00) // Green
            .setDescription(`✅ Successfully set the server prefix to \`${newPrefix}\``);

        return message.channel.send({ embeds: [embed] });
    }
};
