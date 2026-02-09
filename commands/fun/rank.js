const {
    AttachmentBuilder,
    EmbedBuilder
} = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
    name: 'rank',
    aliases: ["level"],
    description: 'Shows the current level and rank of the user!',

    run: async (client, message, args) => {
        if (!message.guild) return;
        if (message.author.bot) return;

        const target = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(target.id);

        const user = await Levels.fetch(target.id, message.guild.id, true);

        if (!user) return message.channel.send("Seems like this user has not earned any xp so far.");
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);

        const status = member?.presence?.status || "offline";

        const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');

        // Hide username/discriminator in base card to draw manually
        const Rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL({
                dynamic: true,
                format: "jpg"
            }))
            .setCurrentXP(user.xp)
            .setRank(parseInt(user.position))
            .setLevel(user.level)
            .setRequiredXP(neededXp)
            .setStatus(status)
            .setProgressBar("BLACK", "COLOR")
            .setUsername(" ") // Empty space so canvacord doesn't complain
            .setDiscriminator(""); // Hide discriminator

        // Manually override color to match background or be invisible just in case
        Rank.data.username.color = "#00000000";
        Rank.data.discriminator.color = "#00000000";

        const data = await Rank.build();
        const card = await loadImage(data);

        const canvas = createCanvas(card.width, card.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(card, 0, 0);

        // Manually draw text
        // Register font if needed, but canvacord likely registered them globally already
        // Default fonts: MANROPE_BOLD

        const displayName = member.displayName || target.username;
        const username = target.username;

        ctx.font = 'bold 36px "MANROPE_BOLD"';
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        ctx.fillText(displayName, 272, 129); // Big text moved up slightly to separate

        ctx.font = '26px "MANROPE_BOLD"'; // Using same font family for consistency
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "start";
        ctx.fillText(username, 272, 164); // Small text below

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: "RankCard.png" });
        message.reply({ files: [attachment] });

    }
}