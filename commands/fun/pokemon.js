const {
    get
} = require("request-promise-native");
const {
    EmbedBuilder
} = require("discord.js")

module.exports = {
    name: "pokemon",
    category: "info",
    description: "Get any pokemon description",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send('**Please specify a pokemon!**')
        }

        const options = {
            url: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(" ")}`,
            json: true
        }

        message.channel.send("Fetching Informtion for API").then(msg => {
            get(options).then(body => {
                let embed = new EmbedBuilder()
                    .setAuthor({ name: body.name, iconURL: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.typeIcon}` })
                    .setDescription(body.info.description)
                    .setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.photo}`)
                    .setColor("#ff2050")
                    .setFooter({ text: `Weakness of pokemon - ${body.info.weakness}`, iconURL: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.weaknessIcon}` })

                message.channel.send({ embeds: [embed] })
                msg.delete()
            })
                .catch(err => {
                    msg.delete();
                    message.channel.send("Pokemon not found!");
                });
        })
    }
}