module.exports = {
    name: "restart",
    aliases: ["shutdown", "shut down"],
    description: "Restarts the bot",
    run: async (client, message, args) => {
        if (!client.config.owners.includes(message.author.id)) {
            return message.channel.send("Only the bot owner can use this command!")
        }
        await message.reply("A shutdown will commence...")
        process.exit()
    }
}