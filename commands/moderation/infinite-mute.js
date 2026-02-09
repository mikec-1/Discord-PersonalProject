
let ms = require('ms');


module.exports = {
  name: "infinite-mute",
  category: "moderation",
  description: "Mute someone",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES") || !message.member.permissions.has("MUTE_MEMBERS") || !message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("You don't have any permissions to do this: Manage Messages/Mute Members/Admin");
    }
    if (!client.mute) client.mute = new Map();

    let user = message.guild.members.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("You need to mention the user.");
    if (user.id === client.user.id) return message.channel.send("You can't mute me.");
    if (user.id === message.author.id) return message.channel.send("You can't mute yourself.");
    let role = message.guild.roles.cache.find(r => r.name === "Muted");
    let bot = message.guild.members.cache.get(client.user.id).roles.highest;

    if (!role) return message.channel.send("Couldn't find the mute role.");
    if (role.position > bot.position) return message.channel.send("The role is higher than me.");

    let time = args[1];

    if (!time) {
      if (user.roles.cache.has(role.id)) return message.channel.send("The user is still muted.");
      await (user.roles.add(role.id).catch(err => message.channel.send(`Something went wrong: ${err}`)))
      return message.channel.send(`${user.user.tag} is now muted.`);
    } else {
      if (user.roles.cache.has(role.id)) return message.channel.send("The user is still muted.");
      await (user.roles.add(role.id).catch(err => message.channel.send(`Something went wrong: ${err}`)))

      let timer = setTimeout(function () {
        user.roles.remove(role.id).catch(err => message.channel.send(`Something went wrong: ${err}`));
        message.channel.send(`${user.user.tag} is now unmuted.`);
      }, ms(time))

      client.mute.set(user.user.id, timer);
      message.channel.send(`${user.user.tag} is now muted for **${ms(ms(time), { long: true })}**`);
    }
  }
}