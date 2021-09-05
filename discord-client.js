const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS
    ]
});

let guild = null;

client.on('ready', () => {
    console.log('Discord client is ready');

    guild = client.guilds.cache.get('881126214448840755');
});

async function createChannel(name, maxMembers) {
    const channel = await guild.channels.create(name, {
        type: 'GUILD_VOICE',
        topic: 'Добро пожаловать на тренировку!',
        userLimit: maxMembers + 1
    });
    const invite = await channel.createInvite({
        unique: true,
        reason: 'Это приглашение в канал для вашей тренировки :P'
    });

    return invite;
}

client.login(process.env.DISCORD_CLIENT_KEY);

module.exports = {
    createChannel
};
