const Levels = require("discord-xp");
const {
    EmbedBuilder
} = require('discord.js')
module.exports = {
    name: 'leaderboard',
    description: "Shows you the people with the most xp in the server",
    aliases: ['xplb', 'xp'],
    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return message.channel.send("Nobody's in the leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} Level: ${e.level} XP: ${e.xp.toLocaleString()}`);
        const embed = new EmbedBuilder()
            .setTitle('**Leaderboard**')
            .setDescription(`\n${lb.join("\n")}`)
        message.channel.send({ embeds: [embed] })

    }
}