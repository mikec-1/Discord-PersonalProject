const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "cat",
    description: "Get a random image and fact about cats",
    usage: "$cat",
    category: "animals",
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/cat";
        const facts = "https://some-random-api.ml/facts/cat"

        let image, response;
        let fact, responses;
        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new EmbedBuilder()
            .setTitle(`Random Cat Image and Fact`)
            .setColor(`#f3f3f3`)
            .setDescription(fact.fact)
            .setImage(image.link)

        await message.channel.send({ embeds: [embed] })
    }
}