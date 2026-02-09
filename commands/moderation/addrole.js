const {
    Message
} = require('discord.js')

module.exports = {
    name: 'addrole',
    aliases: ["add"],
    description: ["Lets you add a role to a user"],
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You don\'t have permission to add roles.')
        if (!message.guild.members.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}**, I do not have permission to add roles!`)

        const target = message.mentions.members.first()

        if (!target) return message.channel.send('No member specified')

        const role = message.mentions.roles.first()

        if (!role) return message.channel.send('No role specified')
        
        try {
            await target.roles.add(role)
            message.channel.send(`${target.user.username} has obtained ` + `${role}`)
        } catch(e) {
            message.channel.send("I am unable to give you that role!")
        }
    }
}