const {
    EmbedBuilder
} = require("discord.js");

module.exports = {
    name: "suggest",
    category: "main",
    usage: "<message>",
    description: "suggest anything you wanted to",
    run: async (bot, message, args) => {
        let suggestion = args.join(" ");
        if (!suggestion)
            return message.channel.send(`Please provide a suggestion!`)
        let sChannel = message.guild.channels.cache.find(x => x.name === "suggestions");
        if (!sChannel) return message.channel.send("You don't have channel with the name `suggestions`")
        message.channel.send("Your suggestion has been filled to the staff team. Thank you!")
        let suggestembed = new EmbedBuilder()
            .setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL })
            .setTimestamp()
            .addFields({ name: `New Suggestion from:`, value: `**${message.author.tag}**` })
            .addFields({ name: `Suggestion:`, value: `${suggestion}\n**Its your choice!**` })
            .setColor('#ff2052');
        sChannel.send({ embeds: [suggestembed] }).then(async msg => {
            await msg.react("✅");
            await msg.react("❌");
        });
    }
};