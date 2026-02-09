const Discord = require("discord.js"),
    {
        post
    } = require("node-superfetch");
const config = require('../../config.json')
module.exports = {
    name: "eval",
    aliases: ["ev"],
    category: "owner",
    description: "Evaluate some code",
    run: async (client, message, args) => {
        // This command is super frickin' dangerous. Make it only visible and usable for you only, or give it to someone you trust.

        if (!client.config.owners.includes(message.author.id)) return;

        const embed = new Discord.EmbedBuilder()
            .addFields({ name: "Input", value: "```js\n" + args.join(" ") + "```" });

        try {
            const code = args.join(" ");
            if (!code) return message.channel.send("Please include the code.");
            let evaled;

            if (code.includes(`TOKEN`) || code.includes("process.env")) {
                evaled = "Why do you want my token?";
            } else {
                evaled = eval(code);
            }

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {
                depth: 0
            });

            let output = clean(evaled);
            if (output.length > 1024) {
                // If the output was more than 1024 characters, we're gonna send it as a file.
                const { AttachmentBuilder } = require('discord.js');
                const attachment = new AttachmentBuilder(Buffer.from(output), { name: 'output.txt' });
                message.channel.send({ files: [attachment] });
                embed.addFields({ name: "Output", value: "Output was too long, sent as file." }).setColor(0x7289DA);
            } else {
                embed.addFields({ name: "Output", value: "```js\n" + output + "```" }).setColor(0x7289DA)
            }

            message.channel.send({ embeds: [embed] });

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
                // Do the same like above if the error output was more than 1024 characters.
                const { AttachmentBuilder } = require('discord.js');
                const attachment = new AttachmentBuilder(Buffer.from(err), { name: 'error.txt' });
                message.channel.send({ files: [attachment] });
                embed.addFields({ name: "Output", value: "Error was too long, sent as file." }).setColor(0xFF0000);
            } else {
                embed.addFields({ name: "Output", value: "```js\n" + err + "```" }).setColor(0xFF0000);
            }

            message.channel.send({ embeds: [embed] });
        }
    }
}

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}