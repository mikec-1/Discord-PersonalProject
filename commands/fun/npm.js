const Discord = require('discord.js');
const snek = require('node-superfetch');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    name: "npm",
    category: "fun",
    description: "Gets information on an npm package",
    run: async (client, message, args) => {
        if (args.length === 0) return message.reply('You must supply a package name!');
        const pkg = args[0];
        try {
            const {
                body
            } = await snek.get(`https://registry.npmjs.com/${pkg}`);
            const embed = new Discord.EmbedBuilder()
                .setColor(0xCB3837)
                .setAuthor({ name: 'NPM', iconURL: 'https://i.imgur.com/ErKfSXY.png', url: 'https://www.npmjs.com/' })
                .setTitle(body.name)
                .setURL(`https://www.npmjs.com/package/${pkg}`)
                .setDescription(body.description || 'No description.')
                .setThumbnail(`https://cdn.auth0.com/blog/npm-package-development/logo.png`)
                .addFields({ name: 'Version', value: body.version, inline: true })
                .addFields({ name: 'License', value: body.license || 'None', inline: true })
                .addFields({ name: 'Repository', value: body.repository ? `[Click Here](${body.repository.url.split("+")[1]})` : "None", inline: true })
                .addFields({ name: 'Dependencies', value: body.dependencies ? Object.keys(body.dependencies).join(', ') : 'None', inline: true })
                .addFields({ name: 'Keywords', value: body.keywords ? body.keywords.join(', ') : 'None', inline: true })
                .addFields({ name: 'Maintainers', value: body.maintainers ? body.maintainers.map(m => m.name).join(', ') : 'None', inline: true })
                .addFields({ name: 'Last Updated', value: moment(body.time.modified).format("MM/DD/YYYY h:mm A"), inline: true });

            message.channel.send({ embeds: [embed] });
        } catch (e) {
            if (e.status === 404) return message.reply('Could not find that package.');
            return message.reply('Could not find that package.');
        }
    }
}