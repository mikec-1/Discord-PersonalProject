const discordTranscripts = require('discord-html-transcripts');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
    name: 'transcript',
    run: async (client, message, args) => {
        // Must be in a channel to transcript
        if (!message.channel) return;

        const attachment = await discordTranscripts.createTranscript(message.channel, {
            limit: -1, // Fetch all messages
            returnType: 'attachment', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' 
            filename: 'transcript.html', // Only valid with returnType is 'attachment'. Default: 'transcript.html'
            saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
            footerText: "Exported {number} message{s}", // Change text at footer, don't forget to put {number} to show how many messages exported, and {s} for plural
            poweredBy: true // Whether to include the "Powered by discord-html-transcripts" footer
        });

        message.channel.send({
            files: [attachment]
        });
    }
}