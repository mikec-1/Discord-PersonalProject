module.exports = {
    name: 'webhook',
    description: 'Makes a webhook to impersonate someone',
    usage: '<user> <message>',
    category: 'fun',
    run: async (client, message, args) => {
        const { PermissionFlagsBits } = require('discord.js');
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageWebhooks)) {
            return message.channel.send("I don't have the `Manage Webhooks` permission to do this!");
        }
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send('Please provide a user!')
        const webhook = await message.channel.createWebhook({
            name: user.displayName,
            avatar: user.displayAvatarURL({ dynamic: true })
        });
        await webhook.send(args.slice(1).join(' ')).then(() => {
            webhook.delete()
        })
    }
}