const fs = require("fs");
const mongoose = require("mongoose");
const botconfig = require("../../config.json");
const Discord = require('discord.js');

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../../models/data");


module.exports = {
    name: "balance",
    category: "economy",
    aliases: ["bal", "money"],
    description: "Tells you how much money you have",
    run: async (client, message, args) => {
        if (!args[0]) {
            var user = message.author;
        } else {
            var user = message.mentions.users.first() || client.users.cache.get(args[0]);
        }

        Data.findOne({
            userID: user.id
        }, (err, data) => {
            if (err) console.log(err);
            if (!data) {
                const newData = new Data({
                    name: client.users.cache.get(user.id).username,
                    userID: user.id,
                    lb: "all",
                    money: 0,
                    daily: 0,
                })
                newData.save().catch(err => console.log(err));
                let wembed = new Discord.EmbedBuilder()
                    .setTitle(`${user.username}'s balance`)
                    .setDescription(`Balance: $0`)
                return message.channel.send({ embeds: [wembed] })
            } else {
                let embed = new Discord.EmbedBuilder()
                    .setTitle(`${user.username}'s balance`)
                    .setDescription(`Balance: $${data.money}`)
                return message.channel.send({ embeds: [embed] })
            }
        })
    }
}