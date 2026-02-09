const Discord = require('discord.js');

module.exports = {
    name: "invite",
    category: "fun",
    description: "Lets you invite my discord bot to your server or generates an invite link with the specified ID",
    run: async (client, message, args) => {
        if (!args[0]) {
            let embed = new Discord.EmbedBuilder()
                .setTitle(':envelope_with_arrow: Invite') // <:emoji_name:id>
                .setColor(Math.floor(Math.random() * 16777215))
                .setDescription('Hello There, Want To Add Me To Your Server?')
                .addFields({ name: 'Invite', value: `Click [Here](https://discord.com/api/oauth2/authorize?client_id=752964112354639882&permissions=1543629911&scope=bot) To Invite Me!` })
            message.channel.send({ embeds: [embed] })
        } else {
            message.channel.send(`https://discordapp.com/oauth2/authorize?client_id=${args[0]}&scope=bot`)
        }
        
    }
}