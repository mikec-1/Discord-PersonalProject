const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "report",
  category: "moderation",
  description: "Report a user of your choice!",
  usage: "<User mention>",
  run: async (bot, message, args) => {
    let User = message.mentions.users.first() || null;

    if (!User) {
      return message.channel.send(`You did not mention a user!`);
    } else {
      let Reason = message.content.slice(22 + 7) || null;
      if (!Reason) {
        return message.channel.send(
          `You did not specify a reason for the report!`
        );
      }
      let Avatar = User.displayAvatarURL();
      let Channel = message.guild.channels.cache.find(
        (ch) => ch.name === "reports"
      );
      if (!Channel)
        return message.channel.send(
          `There is no channel in this guild called \`reports\``
        );
      let Embed = new EmbedBuilder()
        .setTitle(`New report!`)
        .setDescription(
          `${message.author.tag}` + " has reported the user " + `${User.tag}!`
        )
        .setColor(`RED`)
        .setThumbnail(Avatar)
        .addFields(
          { name: "Reporter ID", value: `${message.author.id}`, inline: true },
          { name: "Reporter Tag", value: `${message.author.tag}`, inline: true },
          { name: "Reported ID", value: `${User.id}`, inline: true },
          { name: "Reported Tag", value: `${User.tag}`, inline: true },
          { name: "Reason", value: `\`${Reason.slice(2)}\``, inline: true },
          {
            name: "Date (D/M/Y)",
            value: `${new Intl.DateTimeFormat("de-AT").format(Date.now())}`,
            inline: true,
          }
        );
      Channel.send({ embeds: [Embed] });
      message.channel.send("Thank you, the user has been reported.")
    }
  },
};