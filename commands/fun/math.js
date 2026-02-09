const math = require('mathjs')
const Discord = require('discord.js')

module.exports = {
    name: "math",
    category: "fun",
    description: "Does your math homework for you",
    run: async (client, message, args) => {

        if (!args[0]) return message.channel.send('Please provide a question');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a **valid** question')
        }

        const embed = new Discord.EmbedBuilder()
            .setColor(0x808080)
            .setTitle('Calculator')
            .addFields({ name: 'Question', value: `\`\`\`css\n${args.join(' ')}\`\`\`` })
            .addFields({ name: 'Answer', value: `\`\`\`css\n${resp}\`\`\`` })

        message.channel.send({ embeds: [embed] });

    }
}