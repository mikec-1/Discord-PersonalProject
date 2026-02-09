const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'permissions',
  aliases: ['perms'],
  description: 'List the server permissions of mentioned user or provided ID',
  run: async (bot, message, [member = '']) => {
    if (!member.match(/\d{17,19}/)) {
      member = message.author.id;
    };

    member = await message.guild.members
      .fetch(member.match(/\d{17,19}/)[0])
      .catch(() => null);

    if (!member) {
      return message.channel.send(`\\❌ User not found.`);
    };

    const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();

    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(member.displayColor || 'GREY')
          .setTitle(`${member.displayName}'s Permissions`)
          .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

          .setTimestamp()
          .setDescription([
            '\\♨️ - This Server',
            '\\#️⃣ - The Current Channel',
            '```properties',
            '♨️ | #️⃣ | Permission',
            '========================================',
            `${Object.keys(sp).map(perm => [
              sp[perm] ? '✔️ |' : '❌ |',
              cp[perm] ? '✔️ |' : '❌ |',
              perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')
            ].join(' ')).join('\n')}`,
            '```'
          ].join('\n'))
      ]
    });
  }
};