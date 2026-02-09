const Discord = require("discord.js");

module.exports = {
    name: "botinfo",
    category: "fun",
    description: "Returns bot info",
    run: async (client, message, args) => {
        let boticon = client.user.displayAvatarURL();
        let botembed = new Discord.EmbedBuilder()
            .setDescription("Bot Information")
            .setColor("0ED4DA")
            .setThumbnail(boticon)
            .addFields({ name: "Bot Name", value: client.user.username })
            .addFields({ name: "Bot Creation Date", value: client.user.createdAt })
            .addFields({ name: "Servers", value: client.guilds.cache.size, inline: true })
            .addFields({ name: "Members", value: client.users.cache.size, inline: true })
        message.channel.send({ embeds: [botembed] })
    }
}