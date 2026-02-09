const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "poke",
    category: "info",
    description: "poke someone",
    run: async (client, message, args, tools) => {
        let rUser = message.mentions.members.first();

        const {
            body
        } = await superagent
            .get("https://nekos.life/api/v2/img/poke");

        if (!args[0]) {
            const ghembed = new Discord.EmbedBuilder()
                .setColor(0xa88e79)
                .setDescription(`**<@${message.author.id}>** wants to be poked`)
                .setImage(body.url)
            message.channel.send({
                embed: ghembed
            })
            return;
        }
        if (!message.mentions.members.first().user.username === message.mentions.has(message.author)) {
            const hembed = new Discord.EmbedBuilder()
                .setColor(0xa88e79)
                .setDescription(`**<@${message.author.id}>** pokes <@${rUser.user.id}>`)
                .setImage(body.url)
            message.channel.send({
                embed: hembed
            })
            return;
        }
        const ghembed = new Discord.EmbedBuilder()
            .setColor(0xa88e79)
            .setDescription(`**<@${message.author.id}>** pokes himself`)
            .setImage(body.url)
        message.channel.send({
            embed: ghembed
        });
    }
}