const { EmbedBuilder } = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "warn",
    category: "moderation",
    usage: "warn <@mention> <reason>",
    description: "warn anyone that does\'t obey the rules",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You need to be an admin to be able to use this command!")
        }
        const user = message.mentions.members.first()
        if(!user) {
            return message.channel.send("You need to mention the person you want to warn!")
        }
        if(message.mentions.users.first().bot) {
            return message.channel.send("You can\'t warn bots!")
        }
        const reason = args.slice(1).join(" ")
        if(!reason) {
            return message.channel.send("Please specify a reason to warn this person!")
        }
        if(message.author.id === user.id) {
            return message.channel.send("You can't warn yourself!")
        }
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
        if(warnings === 3) {
            return message.channel.send(`${message.mentions.user.first().username} has reached the highest amount of warnings!`)
        }
        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You have been warned in **${message.guild.name}** for \`${reason}\``)
            await message.channel.send(`You warned ${message.mentions.users.first().username} for **${reason}**`)
        } else if(warnings !== null) {
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You have been warned in **${message.guild.name}** for \`${reason}\``)
            await message.channel.send(`You warned ${message.mentions.users.first().username} for **${reason}**`)
        }
        


    }
}