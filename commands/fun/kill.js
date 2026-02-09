const {Client, Message, EmbedBuilder} = require('discord.js');
module.exports = {
    name:'kill',
    aliases: ["die"],
    description: "Kill anyone! :(",
    run:async(client,message,args)=>{
        const target = message.mentions.users.first() || message.author();
        const DyingWays = ['Scooter ankle, R.I.P','putting a toaster in the bath','promising ur son robux','insulting gurenge, that idiot','watching gacha','watching a netflix adaptation','insulting e']
        const dyingIndex = Math.floor(Math.random()* DyingWays.length);
        message.channel.send(`${target} died by ${DyingWays[dyingIndex]} `)
    }
}