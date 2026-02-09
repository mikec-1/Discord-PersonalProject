const canvacord = require("canvacord");
const {
    AttachmentBuilder
} = require("discord.js");

module.exports = {
    name: "trigger",
    description: "Trigger yourself",

    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let triggered = await canvacord.Canvas.trigger(user.displayAvatarURL({
            format: "png",
            dynamic: false,
            extension: "png"
        }));
        let attachment = new AttachmentBuilder(triggered, { name: "triggered.gif" });
        return message.channel.send({ files: [attachment] });
    }
}