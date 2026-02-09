const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
    name: "slap",
    description: "slap someone in your guild",
    run: async (bot, message, args) => {
        if (!args[0]) {
            return message.channel.send("You need to slap someone")
        }
        let user1 = message.author;
        let user2 = message.mentions.users.first();
        let user1Avatar = user1.displayAvatarURL({
            dynamic: false,
            format: "png"
        });
        let user2Avatar = user2.displayAvatarURL({
            dynamic: false,
            format: "png"
        });
        let image = await canvacord.Canvas.slap(user1Avatar, user2Avatar);
        let attachment = new Discord.AttachmentBuilder(image, { name: "slap.png" });
        return message.channel.send({ files: [attachment] });
    },
}