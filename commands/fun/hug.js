const Discord = require("discord.js");


module.exports = {
    name: "hug",
    category: "info",
    description: "Hug someone!",
    run: async (client, message, args) => {
        let gifs = [
            "https://media.giphy.com/media/wnsgren9NtITS/giphy.gif",
            "https://i.imgur.com/r9aU2xv.gif",
            "https://acegif.com/wp-content/uploads/anime-hug.gif",
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];
    
        let embed = new Discord.EmbedBuilder();
        embed.setColor(`PURPLE`);
        embed.setImage(pick);
    
        if(args[0]) {
            let user = message.mentions.members.first();
            embed.setTitle(`${message.author.username} hugs ${client.users.cache.get(user.id).username}!`);
        } else {
            embed.setTitle(`${message.author.username} wants a hug.`);
        }
    
        return message.channel.send({ embeds: [embed] });
    }
}