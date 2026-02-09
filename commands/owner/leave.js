module.exports = {
  name: "leave",
  category: "moderation",
  description: "The bot leave the server",
  run: async (client, message, args) => {
    if (!client.config.owners.includes(message.author.id)) return message.channel.send(`${message.author.username}, only the bot owner has the permission to execute this command.`);
    let id = args[0];
    if (!id) id = message.guild.id;
    client.guilds.cache.get(id).leave()
      .then(g => console.log(`Left ${g}`))
  }
}