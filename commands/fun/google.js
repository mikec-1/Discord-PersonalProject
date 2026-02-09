const Discord = require('discord.js');
const request = require("node-superfetch")

module.exports = {
    name: "google",
    description: 'Sends the first search result that you specified',
    run: async (bot, message, args,) => {
        let googleKey = "AIzaSyA1cM1C3kFwR8uyTOSSDh7dThNzOIWEINc"; //get a google api key https://www.youtube.com/watch?v=iM12nF0tBuM
        let csx = "49223130713e974a2"; // Search engine ID. 
        let query = args.join(" ");
        let result;

        if (!query) return message.channel.send("Please enter the query.");

        href = await search(query);
        if (!href) return message.channel.send("Unknown search.");

        const embed = new Discord.EmbedBuilder()
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null) // Sometimes, the thumbnail might be unavailable in variant site. Returning it to null.
            .setURL(href.link)
            .setColor(0x7289DA)
            .setFooter({ text: "All information is provided by Google" })

        return message.channel.send({ embeds: [embed] });

        async function search(query) {

            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                key: googleKey, cx: csx, safe: "off", q: query
            });

            if (!body.items) return null;
            return body.items[0];
        }
    },
};