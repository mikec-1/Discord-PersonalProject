const {
  EmbedBuilder
} = require("discord.js");

module.exports = {
  name: "send",
  aliases: ["dm"],
  description: "DM somebody",
  usage: "[Prefix]dm",
  category: "fun",
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    if (!message.guild.members.me.hasPermission("SEND_MESSAGES")) {
      message.channel.send(`I don't have permissions to execute that command! Permissions Required: [Send_Messages]`)
      message.author.send(`I don't have permissions to execute that command! Permissions Required: [Send_Messages]`);
    }

    if (!message.guild.members.me.hasPermission("ADMINISTRATOR")) {
      message.channel.send(`I don't have permissions to execute that command! Permissions Required: [Administrator]`)
    }
    if (!message.author.hasPermission("ADMINISTRATOR")) {
      message.channel.send(`You don't have permission to do that! Permissions Required: [Administrator]`)
    }
    if (user.bot) {
      return message.channel.send("You can't dm Bots!")
    }

    try {
      let member =
        (await message.mentions.users.first()) ||
        (await client.users.fetch(args[0]).catch(() => null)) ||
        (await message.guild.members.get(args[0]));
      if (!member || !args[0])
        return message.channel.send(`Please Mention A User!`);
      let msg = args.slice(1).join(" ") || `Please Give Me Message!`;

      member.send(
        new EmbedBuilder()
        .setTitle(`Dm Message | Sender : ${message.author.username}`)
        .setColor(Math.floor(Math.random() * 16777215))
        .setDescription(msg.size > 1900 ? `${msg.substr(0, 1900)}...` : msg)
      );
      return message.channel
        .send(`Message Has Been Sent Successfully! <@${message.author.id}>`)
    } catch (err) {
      console.error(err);
      return message.channel
        .send(
          `I Couldn't Dm That User! | Something Went Wrong Please Try Again Later!`
        )
    }
  }
};