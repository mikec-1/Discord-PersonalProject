const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "binary",
    aliases: ["encode"],
    description: "Turns text into binary",
    category: "extra",
    run: async (client, message, args) => {
        const url = `http://some-random-api.ml/binary?text=${args}`;
        if(!args[0]) return message.channel.send("Please input a message that you want to encode!")
        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`The Api is currently down, please try again later!`)
        }
        message.channel.send("Translating into Binary...").then(async msg => {
        const embed = new EmbedBuilder()
            .setTitle('Text to Binary')
            .setDescription(data.binary)
        msg.delete()
        await message.channel.send({ embeds: [embed] })
        })
    }
}