const {
    Client,
    Message,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Shows you everything about the server that the command is run in',
    category: 'fun',
    run: async (client, message, args) => {
        const {
            guild
        } = message

        const {
            name,
            region,
            memberCount,
            owner,
            afkTimeout
        } = guild;
        const totalchannels = guild.channels.cache.size;
        const totalcat = guild.channels.cache.filter((c) => c.type == "category").size;
        const totaltext = guild.channels.cache.filter((c) => c.type === "text").size;
        const totalvoice = guild.channels.cache.filter((c) => c.type === "voice").size;
        const creationunformatted = guild.createdAt;
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }
        const creation = creationunformatted.toLocaleDateString("en-GB", options);
        const bots = guild.members.cache.filter(member => !member.user.bot).size;
        const human = guild.members.cache.filter(member => member.user.bot).size;
        const icon = guild.iconURL({
            size: 4096
        })

        let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(",");
        if (rolemap.length > 1024) rolemap = "To many roles to display";
        if (!rolemap) rolemap = "No roles";

        const embed = new EmbedBuilder()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields({
                name: 'Region',
                value: region,
                inline: true,
            }, {
                name: 'Members',
                value: `${memberCount} total members,\n${bots} bots, ${human} humans`,
                inline: true,
            }, {
                name: 'Owner',
                value: owner.user.tag,
                inline: true,
            }, {
                name: 'AFK Timeout',
                value: afkTimeout / 60,
                inline: true,
            }, {
                name: 'Total Channels',
                value: `${totalchannels} total channels:\n${totalcat} categories\n${totaltext} text, ${totalvoice} voice`,
                inline: true,
            }, {
                name: 'Server Created',
                value: `${creation}`,
                inline: true,
            }, {
                name: 'Roles',
                value: rolemap,
                inline: true,
            })
            .setFooter({
                text: `Server name: ${guild.name} | Server ID: ${guild.id}`, iconURL: guild.iconURL({
                    size: 4096
                })
            })
            .setColor('#7289da')

        message.channel.send({ embeds: [embed] })
    }
}