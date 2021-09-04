const express = require('express');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const Discord = require('discord.js');
const cookieParser = require('cookie-parser');
require('dotenv/config');

const app = express();

// Auth Passport setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretCode',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser('secretCode'));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Routes setup
const gamesRoute = require('./routes/games');
const usersRoute = require('./routes/users');
const coachesRoute = require('./routes/coaches');

app.use('/games', gamesRoute);
app.use('/users', usersRoute);
app.use('/coaches', coachesRoute);

// Discord client setup
// const client = new Discord.Client();

// let invite = null;

// client.on('ready', () => {
//     const guild = client.guilds.cache.get('881126214448840755');
//     // const everyoneRole = guild.roles.cache.find(r => r.name === '@everyone');

//     console.log('discord client is ready');

//     client.guilds.cache.forEach(g => console.log(g.name))

//     guild.roles.create({
//         data: {
//             name: 'student'
//         }
//     }).then(role => {
//         guild.channels.create('zalupa', {
//             type: 'GUILD_VOICE',
//             topic: 'ULLALALLAA',
//             // permissionOverwrites: [{
//             //     id: everyoneRole.id,
//             //     deny: [
//             //         Discord.Permissions.FLAGS.CREATE_INSTANT_INVITE,
//             //         Discord.Permissions.FLAGS.VIEW_CHANNEL,
//             //         Discord.Permissions.FLAGS.CONNECT,
//             //         Discord.Permissions.FLAGS.SPEAK,
//             //     ]
//             // },{
//             //     id: role.id,
//             //     allow: [
//             //         Discord.Permissions.FLAGS.VIEW_CHANNEL,
//             //         Discord.Permissions.FLAGS.CONNECT,
//             //         Discord.Permissions.FLAGS.SPEAK
//             //     ]
//             // }]
//         }).then(res => {
//             res.createInvite({
//                 maxUses: 1,
//                 unique: true,
//                 maxAge: 0,
//                 reason: 'Это приглашение в канал для вашей тренировки :P'
//             }).then(c => console.log(c.code)).catch();
//         });
//     });
// });

// client.on("guildMemberAdd", async (member) => {
//     console.log('YOOOOOO!!!OO!O!');
//   });

//   client.login('ODgxMTEwNjA4NTU5MzYyMDQ5.YSoEMw.znn3tZOVECQQ9DYz8NlsvePUpKs');

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true },
    () => console.log('Connected to db')
    );

// Serve static content if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('./client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
