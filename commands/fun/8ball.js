const {
    EmbedBuilder
} = require("discord.js");
module.exports = {
    name: "8ball",
    description: "There is a big chance I insult you!",
    category: "fun",
    run: async (client, message, args) => {
        let question = message.content.slice(6);
        if (!question)
            return message.channel.send(`You did not specify your question!`);
        else {
            let responses = [
                "Yes",
                "No",
                "Definitely",
                "Absolutely",
                "Indeed",
                "Not in a million years",
            ];
            let response =
                responses[Math.floor(Math.random() * responses.length)];
            let Embed = new EmbedBuilder()
                .setTitle(`8Ball!`)
                .setDescription(`Your question: ${question}\nMy reply: ${response}`)
                .setColor(Math.floor(Math.random() * 16777215));
            message.channel.send({ embeds: [Embed] });
        }
    }
};