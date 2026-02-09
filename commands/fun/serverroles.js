const Discord = require('discord.js')

module.exports = {
  name: 'serverroles',
  description: 'Get the list of all server roles',
  aliases: ["rolelist"],
  run: async (bot, message, args) => {
    let rolemap = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r)
      .join(", ");
    if (rolemap.length > 1024) rolemap = "Too many roles to display";
    if (!rolemap) rolemap = "No roles";
    const embed = new Discord.EmbedBuilder()
      .setAuthor({ name: `Server Role List`, iconURL: message.guild.iconURL() })
      .setDescription(rolemap)
      .setColor("GREEN")
    message.channel.send({ embeds: [embed] });
  }
}