const {
    get
} = require("request-promise-native");
const {
    EmbedBuilder
} = require("discord.js")

module.exports = {
    name: "anime",
    category: "info",
    description: "Get anime information",
    aliases: [],
    usage: "anime <anime_name>",
    run: (client, message, args) => {
        let option = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
            method: `GET`,
            headers: {
                'Content-Type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json"

            },
            json: true
        }
        if (!args.length) {
            return message.channel.send("Please Specify The Anime Name")
        }

        message.channel.send("Fetching The Info").then(msg => {
            get(option).then(body => {
                try {
                    let embed = new EmbedBuilder()
                        .setTitle(body.data[0].attributes.titles.en)
                        .setColor("RED")
                        .setDescription(body.data[0].attributes.synopsis)
                        .setThumbnail(body.data[0].attributes.posterImage.original)
                        .addFields({ name: "Ratings", value:  body.data[0].attributes.averageRating })
                        .addFields({ name: "TOTAL EPISODES", value:  body.data[0].attributes.episodeCount })
                        .setImage(body.data[0].attributes.coverImage.large)


                    message.channel.send({ embeds: [embed] })
                    msg.delete();

                } catch (err) {
                    msg.delete();
                    return message.channel.send("Unable to find that anime!");
                }
            })
        })
    }
}