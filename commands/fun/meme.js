const got = require('got')
const {
  EmbedBuilder
} = require('discord.js')

module.exports = {
  name: "meme",
  description: "Get a meme!",
  category: "info",
  run: async (bot, message, args) => {
    got('https://www.reddit.com/r/memes/random/.json').then(res => {
      let content = JSON.parse(res.body)
      message.channel.send(
        new EmbedBuilder()
        .setTitle(content[0].data.children[0].data.title)
        .setImage(content[0].data.children[0].data.url)
        .setColor(Math.floor(Math.random() * 16777215))
        .setFooter(`👍 ${content[0].data.children[0].data.ups} | Comments : ${content[0].data.children[0].data.num_comments}`)
      )
    })
  },
};