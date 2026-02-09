const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "pat",
    category: "info",
    description: "Pat someone!",
    run: async (client, message, args) => {
        let rUser = message.mentions.members.first();

        const {
            body
        } = await superagent
            .get("https://nekos.life/api/v2/img/pat");

        if (!args[0]) {
            const ghembed = new Discord.EmbedBuilder()
                .setColor(0xa88e79)
                .setDescription(`**<@${message.author.id}>** wants to get patted`)
                .setImage(body.url)
            message.channel.send({
                embed: ghembed
            })
            return;
        }
        if (!message.mentions.members.first().user.username === message.mentions.has(message.author)) {
            const hembed = new Discord.EmbedBuilder()
                .setColor(0xa88e79)
                .setDescription(`**<@${message.author.id}>** pats <@${rUser.user.id}>`)
                .setImage(body.url)
            message.channel.send({
                embed: hembed
            })
            return;
        }
        const ghembed = new Discord.EmbedBuilder()
            .setColor(0xa88e79)
            .setDescription(`**<@${message.author.id}>** pats himself`)
            .setImage(body.url)
        message.channel.send({
            embed: ghembed
        });
        message.channel.send(':)')
    }
}