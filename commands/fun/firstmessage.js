const {
    EmbedBuilder
} = require('discord.js')
module.exports = {
    name: "firstmessage",
    description: "Shows the first message that the specified person sent in that server",
    run: async (bot, msg, args) => {
        if (
            msg.channel.type === 0 && // ChannelType.GuildText
            !msg.channel.permissionsFor(bot.user).has('ReadMessageHistory') // GatewayIntentBits.ReadMessageHistory ? No, PermissionsBitField.Flags.ReadMessageHistory
        ) {
            // Permissions are strings in v14? No, bitfields or strings. 'READ_MESSAGE_HISTORY' -> 'ReadMessageHistory' or 'ReadMessageHistory'
            // 'READ_MESSAGE_HISTORY' is valid string in v13/v14? 
            // Better use BigInts or CamelCase strings. v14 uses CamelCase. 'ReadMessageHistory'.
            return msg.reply(
                `Sorry, I don't have permission to read ${msg.channel}...`
            )
        }
        const messages = await msg.channel.messages.fetch({
            after: 1,
            limit: 1
        })
        const message = messages.first()
        if (message.content) {
            const embed = new EmbedBuilder()
                .setColor(message.member ? message.member.displayHexColor : 0x00ae86)
                .setThumbnail(
                    message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true
                    })
                )
                .setTitle(`First Message`)
                .setURL(message.url)
                .setThumbnail(message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true
                }))
                .setDescription(`**Message:** ${message.content}`)
                .addFields({ name: 'CreatedBy', value: `**${message.author}**`, inline: true })
                .addFields({ name: `MessageID`, value: `${message.id}`, inline: true })
                .addFields({ name: 'CreatedAt', value: `${message.createdAt}`, inline: true })
                .setFooter({
                    text: `Requested by: ${message.member.displayName}`, iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
            return msg.channel.send({ embeds: [embed] })
        } else {
            const embed = new EmbedBuilder()
                .setColor(message.member ? message.member.displayHexColor : 0x00ae86)
                .setThumbnail(
                    message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true
                    })
                )
                .setTitle(`First Message`)
                .setURL(message.url)
                .setThumbnail(message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true
                }))
                .setDescription(`**The message could not be found, maybe the channel was nuked or the message was deleted**`)
                .addFields({ name: 'CreatedBy', value: `**${message.author}**`, inline: true })
                .addFields({ name: `MessageID`, value: `${message.id}`, inline: true })
                .addFields({ name: 'CreatedAt', value: `${message.createdAt}`, inline: true })
                .setFooter({
                    text: `Requested by: ${message.member.displayName}`, iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
            return message.channel.send({ embeds: [embed] })
        }
    }
}