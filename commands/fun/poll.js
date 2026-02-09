const Discord = require("discord.js");
module.exports = {
    name: "poll",
    description: "Create a simple yes or no poll",
    category: "fun",
    run: async (bot, message, args) => {
        const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");

        if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
            return message.channel.send(
                `You do not have admin permissions, ${message.author.username}!`
            );
        // Check if the first argument is a channel (mention or ID)
        let channel = message.guild.channels.cache.get(args[0]?.replace(/[<#>]/g, ""));
        let question;

        if (channel) {
            // First arg was a channel, so the question is everything else
            question = args.slice(1).join(" ");
        } else {
            // First arg was NOT a channel, so default to current channel and use all args
            channel = message.channel;
            question = args.join(" ");
        }

        if (!question)
            return message.channel.send(`You did not specify your question!`);

        const Embed = new EmbedBuilder()
            .setTitle(`New poll!`)
            .setDescription(`${question}`)
            .setFooter({ text: `${message.author.username} created this poll.` })
            .setColor(Math.floor(Math.random() * 16777215));

        let msg = await channel.send({ embeds: [Embed] });
        await msg.react("👍");
        await msg.react("👎");
    }
};