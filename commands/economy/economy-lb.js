const Discord = require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../../config.json");

mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require("../../models/data.js");

module.exports = {
    name: "economytop",
    category: "economy",
    aliases: ["economylb", "top"],
    description: "Shows you the richest people",
    run: async (client, message, args) => {
        Data.find({
            lb: "all"
        }).sort([
            ['money', 'descending']
        ]).exec((err, res) => {
            if (err) console.log(err);

            var page = Math.ceil(res.length / 10);

            let embed = new Discord.EmbedBuilder();
            embed.setTitle("LEADERBOARD");
            embed.setThumbnail("https://cdn.dribbble.com/users/1203044/screenshots/4293138/trophy.gif");

            let pg = parseInt(args[0]);
            if (pg != Math.floor(pg)) pg = 1;
            if (!pg) pg = 1;
            let end = pg * 10;
            let start = (pg * 10) - 10;
            if (res.length === 0) {
                embed.addFields({ name: "Error", value: "No pages found!" });
            } else if (res.length <= start) {
                embed.addFields({ name: "Error", value: "Page not found!" });
            } else if (res.length <= end) {
                embed.setFooter({ text: `Page ${pg} of ${pg}` });
                for (i = start; i < res.length; i++) {
                    embed.addFields({ name: `${i + 1}. ${res[i].name}`, value: `$${res[i].money.toLocaleString()}` });
                }
            } else {
                embed.setFooter({ text: `Page ${pg} of ${pg}` });
                for (i = start; i < end; i++) {
                    embed.addFields({ name: `${i + 1}. ${res[i].name}`, value: `$${res[i].money.toLocaleString()}` });
                }
            }

            message.channel.send({ embeds: [embed] });

        });
    }
}