const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const botconfig = require("../../config.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../../models/data.js");

module.exports = {
    name: "gamble",
    category: "economy",
    aliases: ["bet"],
    description: "Gambles your money",
    run: async (client, message, args) => {
        Data.findOne({
            userID: message.author.id,
        }, (err, data) => {
            if (err) console.log(err);
            if (!data) {
                const newData = new Data({
                    name: message.author.username,
                    userID: message.author.id,
                    lb: "all",
                    money: 0,
                    daily: 0,
                })
                newData.save().catch(err => console.log(err));
                return message.reply("sorry you don't have any money to gamble with! Use the daily command!");
            } else {
                var MaxBet = 10000;

                if (data.money <= 0) return message.reply("you don't have any money.");

                if (!args[0]) return message.reply("please specify how much you want to gamble.");

                if (args[0].toLowerCase() == "all") args[0] = data.money

                try {
                    var bet = parseFloat(args[0]);
                } catch {
                    return message.reply("you can only enter whole numbers.");
                }

                if (bet != Math.floor(bet)) return message.reply("you can only enter whole numbers.")

                if (data.money < bet) return message.reply("you don't have that much money.")

                if (bet > MaxBet) return message.reply(`the maximum bet is ${MaxBet.toLocaleString()}.`);

                let chances = ["win", "lose"];
                var pick = chances[Math.floor(Math.random() * chances.length)];

                if (pick == "lose") {
                    data.money -= bet;
                    data.save().catch(err => console.log(err));
                    let embed = new Discord.EmbedBuilder()
                        .setAuthor({ name: 'You lose! ❌' })
                        .setTitle(`Your Balance has changed to $${data.money}`)
                    return message.channel.send({ embeds: [embed] });
                } else {
                    data.money += bet;
                    data.save().catch(err => console.log(err));
                    let embed2 = new Discord.EmbedBuilder()
                        .setAuthor({ name: 'You Win! ✅' })
                        .setTitle(`Your Balance has changed to $${data.money}`)
                    return message.channel.send({ embeds: [embed2] });
                }
            }
        })
    }
}