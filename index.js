const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    EmbedBuilder,
    ActivityType,
    ChannelType,
    PermissionFlagsBits
} = require("discord.js");
const {
    config
} = require("dotenv");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences
    ],

    partials: [Partials.Channel, Partials.Message],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

// client.on("debug", (e) => console.log(e));
// client.on("warn", (e) => console.warn(e));

const db = require('quick.db');
const prefix = require('./config.json').prefix || "$";
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Map();
client.editsnipe = new Map()
client.config = require("./config.json");
// client.config = config; // duplicate assignment, config is a function from dotenv

const express = require('express');
const path = require('path');
const { getCommands } = require('./utils/');
const Levels = require("discord-xp");

// Move this to avoid issues if Levels expects DB connection
try {
    const mongoose = require("mongoose");
    if (client.config.mongoPass) {
        Levels.setURL(client.config.mongoPass);
    }
} catch (e) {
    console.error("Levels Setup Error", e);
}


client.on('messageDelete', function (message) {
    if (!message || message.partial) return;
    if (message.author.bot) return; // Ignore bots

    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        profilephoto: message.author.displayAvatarURL(),
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        date: Date.now()
    })
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    // If old message is partial, we can't get the old content.
    if (oldMessage.partial) return;

    // Ensure both messages exist and have authors (sometimes system messages update)
    if (!oldMessage.author || !newMessage.author) return;

    if (oldMessage.author.bot) return;
    if (!oldMessage.guild) return;

    // If content is identical (e.g. link embed update), ignore
    if (oldMessage.content === newMessage.content) return;

    client.editsnipe.set(oldMessage.channel.id, {
        msg: oldMessage.content,
        newMsg: newMessage.content,
        user: oldMessage.author.tag,
        profilephoto: oldMessage.author.displayAvatarURL(),
        image: oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null,
        date: Date.now()
    });
});

config({
    path: __dirname + "/.env"
});

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("clientReady", () => {
    console.log(`${client.user.username} is online.`);

    client.user.setActivity(db.get(`status`) || "Bot Online");

    function randomStatus() {
        // Uncomment to use random status rotation
        // let status = ["Discord Bot", "YouTube", "Discord", "Minecraft", "Node.js", "Your Mom", "Fortnite", "Epic Games", "Twitch", "Github", "Coding", "Warzone", "Valorant", "Hacking into the FBI", "Don't spam please", "https://discord.gg/2pzzqnP join please"];
        // let rstatus = Math.floor(Math.random() * status.length);
        // client.user.setActivity(status[rstatus], { type: ActivityType.Watching });

        // Show user count
        client.user.setActivity(`${client.users.cache.size} Users`, { type: ActivityType.Watching });
    }

    // Run status rotation every 30 seconds
    randomStatus();
    setInterval(randomStatus, 30000);

    // Generate invite links for all guilds
    client.guilds.cache.forEach(guild => {
        let channel = guild.channels.cache.find(c => c.type === ChannelType.GuildText && c.permissionsFor(guild.members.me).has(PermissionFlagsBits.CreateInstantInvite));
        if (channel) {
            createLink(channel, guild);
        } else {
            console.log(`${guild.name} - No suitable channel for invite`);
        }
    });

    async function createLink(chan, guild) {
        try {
            let invite = await chan.createInvite({ maxAge: 0, maxUses: 0 });
            console.log(`\x1b[36m%s\x1b[0m`, `${guild.name} - ${invite.url}`);
        } catch (e) {
            console.log(`${guild.name} - Error creating invite: ${e.message}`);
        }
    }
});

client.on("clientReady", () => {
    const app = express();
    const port = process.env.PORT || 3000;
    app.set('view engine', "ejs");
    app.get("/", (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "pages", "landingPage.html"))
    });
    app.get("/commands", (req, res) => {
        const commands = getCommands();
        res.status(200).render('commands', { commands })
    });
    app.listen(port, function () {
        console.log("Express server listening on port %d", port);
    });
});

const {
    GiveawaysManager
} = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.on("messageCreate", async message => {
    // Fetch prefix from database or use default
    let prefix = db.fetch(`prefix_${message.guild.id}`) || client.config.prefix || "$";
    // QuickDB might not be async, checking usage
    let blacklist = db.fetch(`blacklist_${message.author.id}`);
    if (blacklist === "Blacklisted") return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // member fetch
    if (!message.member) message.member = await message.guild.members.fetch(message.author.id).catch(() => null);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    console.log(`[DEBUG] Message received: ${message.content}`);

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        console.log(`[DEBUG] Running command: ${command.name}`);
        try {
            command.run(client, message, args);
        } catch (e) {
            console.error(`[DEBUG] Error running command:`, e);
            message.channel.send(`Error executing command: ${e.message}`);
        }
    } else {
        // console.log(`[DEBUG] Command not found: ${cmd}`);
    }
});

// Leveling system
client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;
    try {
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
        }
    } catch (e) {
        // ignore errors
    }
});

client.login(process.env.TOKEN);
