const express = require('express');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
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
const slotsRoute = require('./routes/slots');
const coursesRoute = require('./routes/courses');
const billingRoute = require('./routes/billing');
const commentsRoute = require('./routes/comments');
const ordersRoute = require('./routes/orders');

app.use('/games', gamesRoute);
app.use('/users', usersRoute);
app.use('/coaches', coachesRoute);
app.use('/slots', slotsRoute);
app.use('/courses', coursesRoute);
app.use('/billing', billingRoute);
app.use('/comments', commentsRoute);
app.use('/orders', ordersRoute);

process.on('unhandledRejection', error => console.error('Promise rejection:', error));

// Database setup
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

// Start server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
