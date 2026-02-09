let Discord = require('discord.js');

module.exports = {
    name: "minecraft",
    category: "fun",
    description: "Shows you a players skin",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Please provide a username!');
        if (!args[1]) return message.channel.send('Please specify the category! (full - isometric - avatar - bust - armor)')
        let argsCaps = (args[0])
        if (args[1] == "full") {
            var api = `https://minotar.net/armor/body/${args[0]}/500.png`
            const fullfront = new Discord.EmbedBuilder()
                .setTitle(`${argsCaps}'s Fullfrontal Skin`)
                .setImage(`${api}`)
                .setFooter(`Management`)
            return message.channel.send(fullfront);
            
        }
        if (args[1] == "armor") {
            var api = `https://minotar.net/armor/body/${args[0]}/100.png`

            const armor = new Discord.EmbedBuilder()
                .setTitle(`${argsCaps}'s Armored Skin`)
                .setImage(`${api}`)
                .setFooter(`Management`)
            return message.channel.send(uyarmor)
        };
        if (args[1] == "avatar") {
            var api = `https://minotar.net/avatar/${args[0]}`

            const avatar = new Discord.EmbedBuilder()
                .setTitle(`${argsCaps}'s Avatar`)
                .setImage(`${api}`)
                .setFooter(`Management`)
            return message.channel.send(avatar);
        };
        if (args[1] == "isometric") {
            var api = `https://minotar.net/cube/${args[0]}/100.png`

            const avatar = new Discord.EmbedBuilder()
                .setTitle(`${argsCaps}'s isometric head`)
                .setImage(`${api}`)
                .setFooter(`Management`)
            return message.channel.send(avatar);
        };
        if (args[1] == "bust") {
            var api = `https://minotar.net/bust/${args[0]}/100.png`

            const avatar = new Discord.EmbedBuilder()
                .setTitle(`${argsCaps}'s bust skin`)
                .setImage(`${api}`)
                .setFooter(`Management`)
            return message.channel.send(avatar);
        };
    }
}