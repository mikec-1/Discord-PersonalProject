const { EmbedBuilder, parseEmoji } = require("discord.js");
const {
    parse
} = require("twemoji-parser");

module.exports = {
    name: 'enlarge',
    aliases: [],
    description: 'Enlarges an emoji',
    run: async (client, message, args) => {
        const emoji = args[0];
        if (!emoji) return message.channel.send("No emoji provided!");

        let custom = parseEmoji(emoji);
        const embed = new EmbedBuilder()
            .setTitle(`Enlarged version of ${emoji}`)
            .setColor(0xFFFF00);

        if (custom.id) {
            embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
            return message.channel.send({ embeds: [embed] });
        } else {
            let parsed = parse(emoji, {
                assetType: "png"
            });
            if (!parsed[0]) return message.channel.send("Invalid emoji!");

            embed.setImage(parsed[0].url);
            return message.channel.send({ embeds: [embed] });
        }

    }
}