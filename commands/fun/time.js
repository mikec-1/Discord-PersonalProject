module.exports = {
    name: "time",
    category: "fun",
    description: "Shows you the time of a specified location",
    run: async (client, message, args) => {
        const Discord = require("discord.js"),
            moment = require("moment"),
            fetch = require("node-fetch"),
            cheerio = require("cheerio");
        require("moment-duration-format");
        const location = args[0]
        const body = await fetch(`https://time.is/${location}`)
            .then((res) => res.text())
            .then((html) => cheerio.load(html));
        const error = body("div.w90 h1.error").text();
        if (error) return message.channel.send("No search results found, maybe try searching for something that exists.");

        const locale = body("div#msgdiv").text();
        const time = body("time").text();
        const date = body("div.clockdate").text();

        //Details but not exact details though..
        const title = body("div#maptext ul li").first().text();
        const latlong = body("div#maptext ul li").next().first().text();
        const population = body("div#maptext ul li").next().next().first().text();
        const map = body("div#maptext a").attr('href');
        const info = body("section#time_zone ul li").next().next().next().next().first().text();
        //console.log(`• Error: ${error}\n• Locale: ${locale}\n• Time: ${time}\n• Date: ${date}\n• Title: ${title}\n• Coordination: ${latlong}\n• Population: ${population}\n• Map: ${map}\n• Information: ${info}`)

        const embed = new Discord.EmbedBuilder()
            .setTitle(moment(time, 'HH:mm:ss').format('h:mm:ss A'))
            .setURL(`https://time.is/${encodeURI(location)}`)
            .setDescription(`**${locale ? locale: "\u200b"}**
         ${date ? date: "\u200b"}`)
            .addFields([ //Below of this its work but not exact details, cuz when searching for country it will change the details
                //{ name: "❯ Coordinates"), value: `• ${latlong ? latlong: "Not Specified"}`},
                //{ name: "❯ Population"), value: `• ${population ? population: "Not Specified"}`},
                //{ name: '\u200b', value: info ? info: "\u200b" }
            ])

        return message.channel.send({ embeds: [embed] });
    }
}