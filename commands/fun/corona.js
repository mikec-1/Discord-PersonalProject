const {
  get
} = require("request-promise-native");
const {
  EmbedBuilder
} = require("discord.js")
module.exports = {
  name: 'covid',
  aliases: ['corona'],
  category: 'info',
  description: 'Get current statics of corona of your country/continent/world',
  run: async (client, message, args) => {
    if (args[0] !== 'all') {
      var options = {
        url: 'https://disease.sh/v2/countries/' + args[0],
        json: true
      }
    }
    if (args[0] === 'all') {
      options = {
        url: 'https://disease.sh/v2/all',
        json: true
      }
    }
    let nembed = new EmbedBuilder()
      .setColor(Math.floor(Math.random() * 16777215))
      .setDescription('Country not found or doesn\'t have any cases')
    let oembed = new EmbedBuilder()
      .setColor(Math.floor(Math.random() * 16777215))
      .setDescription('Fetching data from the internet for the best output')
    message.channel.send({ embeds: [oembed] }).then(msg => {
      get(options).then(body => {
        let embed = new EmbedBuilder()
          .setColor(Math.floor(Math.random() * 16777215))
          .setTitle(`Corona status of ` + (body.country === undefined ? 'all countries' : body.country))
          .addFields({ name: 'Total Cases', value: body.cases, inline: true })
          .addFields({ name: 'Cases in 24h', value: body.todayCases, inline: true })
          .addFields({ name: 'Total Deaths', value: body.deaths, inline: true })
          .addFields({ name: 'Deaths in 24h', value: body.todayDeaths, inline: true })
          .addFields({ name: 'Total recovered', value: body.recovered, inline: true })
          .addFields({ name: 'Total Active Cases', value: body.active, inline: true })
          .addFields({ name: 'Critical', value: body.critical, inline: true })
          .addFields({ name: 'CPM', value: body.casesPerOneMillion, inline: true })
          .addFields({ name: 'DPM', value: body.deathsPerOneMillion, inline: true })
          .addFields({ name: 'Total tests', value: body.tests, inline: true })
          .addFields({ name: 'TPM', value: body.testsPerOneMillion, inline: true })
          .setTimestamp()
          .setFooter({ text: 'CPM: cases per million  DPM: deaths per million  TPM: tests per million' })
        if (args[0] !== 'all') embed.addFields({ name: 'Name of country', value: body.country, inline: true })
        if (args[0] !== 'all') embed.setThumbnail(body.countryInfo.flag)
        msg.delete()
        message.channel.send({ embeds: [embed] })

      })
        .catch(body => {
          msg.edit(nembed)
        })
    })
  }
}