const Discord = require("discord.js");
const {
    EmbedBuilder
} = require("discord.js");
const EmbedColor = "RANDOM";
const ErrorMessage = `Error In Getting Information | Please Try Again Later!`;
const ErrorEmbedColor = "RED";

module.exports = {
    name: "channelinfo",
    description: "Give Your Channel Information!",
    aliases: ["channel"],
    usage: "Channelinfo <Mention Channel>",
    example: "Channelinfo",
    run: async (client, message, args) => {
        try {

            let nsfw = message.channel.nsfw ? 'Yes' : 'No';
            let parent = message.channel.parent ? message.channel.parent : 'No Category';
            let topic = message.channel.topic ? message.channel.topic : 'None';
            let embed = new EmbedBuilder()
                .setColor(Math.floor(Math.random() * 16777215))
                .setTitle('Channel Name: ' + message.channel.name)
                .setDescription('Channel Topic: ' + topic)
                .addFields({ name: 'NSFW Channel', value: nsfw, inline: true })
                .addFields({ name: "Channel Category", value: parent, inline: true })
                .addFields({ name: 'Channel Position', value: message.channel.position, inline: true })
                .addFields({ name: "Channel Created At", value: `${message.channel.createdAt.toDateString()}`, inline: true })
                .setFooter(`Requested By: ${message.author.username}`)

            message.channel.send({ embeds: [embed] });

            await message.delete();
        } catch (error) {
            console.log(error);
            message.channel.send(
                new EmbedBuilder()
                    .setColor(`${ErrorEmbedColor}`)
                    .setDescription(`${ErrorMessage}`)
                    .setFooter(`Sorry For Error!`)
                    .setTimestamp()
            );
        }
    }
};