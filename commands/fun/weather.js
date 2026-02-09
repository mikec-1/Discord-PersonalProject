const weather = require('weather-js');
const discord = require('discord.js')


module.exports = {
    name: "weather",
    description: "Get the weather of anywhere",
    category: "info",
    usage: "weathet <>",
    run: (client, message, args) => {


        if (!args.length) {
            return message.channel.send("Please give the weather location")
        }

        weather.find({
            search: args.join(" "),
            degreeType: 'C'
        }, function (err, result) {
            try {

                let embed = new discord.EmbedBuilder()
                    .setTitle(`Weather - ${result[0].location.name}`)
                    .setColor("#ff2050")
                    .setDescription("Temperature units can may be differ some time")
                    .addFields({ name: "Temperature", value:  `${result[0].current.temperature} Celcius`, inline: true })
                    .addFields({ name: "Sky", value:  result[0].current.skytext, inline: true })
                    .addFields({ name: "Humidity", value:  result[0].current.humidity, inline: true })
                    .addFields({ name: "Wind Speed", value:  result[0].current.windspeed, inline: true }) //What about image
                    .addFields({ name: "Observation Time", value:  result[0].current.observationtime, inline: true })
                    .addFields({ name: "Wind Display", value:  result[0].current.winddisplay, inline: true })
                    .setThumbnail(result[0].current.imageUrl);
                message.channel.send({ embeds: [embed] })
            } catch (err) {
                return message.channel.send("Unable To Get the data of Given location")
            }
        });
        //LETS CHECK OUT PKG

    }
}