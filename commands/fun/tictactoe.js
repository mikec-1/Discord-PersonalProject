const { TicTacToe } = require('discord-gamecord');

module.exports = {
    name: 'tictactoe',
    aliases: ['ttt'],
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.channel.send('Please specify a member to play with!');

        const Game = new TicTacToe({
            message: message,
            isSlashGame: false,
            opponent: member,
            embed: {
                title: 'Tic Tac Toe',
                color: '#5865F2',
                statusTitle: 'Status',
                overTitle: 'Game Over'
            },
            emojis: {
                xButton: '❌',
                oButton: '🔵',
                blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} | Its turn of player **{player}**.',
            winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
        });

        Game.startGame();
    }
}