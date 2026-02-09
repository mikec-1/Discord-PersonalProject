const discord = require("discord.js");
const imdb = require("imdb-api");

module.exports = {
    name: "imdb",
    description: "Get the information about series and movie",
    category: "info",
    usage: "imdb <name>",
    run: async (client, message, args, color) => {

        try {
            if (!args.length) {
                return message.channel.send("Please give the name of movie or series")
            }
            const imob = new imdb.Client({
                apiKey: "5e36f0db"
            }) //You need to paste you imdb api
            let movie = await imob.get({
                'name': args.join(" ")
            })

            let embed = new discord.EmbedBuilder()
                .setTitle(movie.title)
                .setColor("#ff2050")
                .setThumbnail(movie.poster)
                .setDescription(movie.plot)
                .setFooter({ text: `Ratings: ${movie.rating}` })
                .addFields({ name: "Country", value: movie.country, inline: true })
                .addFields({ name: "Languages", value: movie.languages, inline: true })
                .addFields({ name: "Type", value: movie.type, inline: true });


            message.channel.send({ embeds: [embed] }).catch(console.error)
        } catch (err) {
            message.channel.send('I couldn\'t find that movie! Please try again!')
        }



    }
}