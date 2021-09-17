const User = require('./models/User');

module.exports = passport => {
    // Local strategy
    const LocalStrategy = require('passport-local');

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (username, password, done) => {
        User.findOne({ email: username }, (err, res) => {
            if (err) {
                return done(err);
            }
            if (!res) return done(null, false);
            if (!res.password) return done(null, false);
            res.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, res);
                } else {
                    return done(null, false);
                }
            });
        });
    }));

    // VK Strategy
    const VKStrategy = require('passport-vkontakte').Strategy;

    passport.use(new VKStrategy({
        clientID: process.env.VKONTAKTE_APP_ID,
        clientSecret: process.env.VKONTAKTE_APP_SECRET,
        callbackURL: '/users/auth/vkontakte/callback',
    }, (req, accessToken, refreshToken, params, profile, done) => {
        User.findOne({ vkontakte: profile.id }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user)
            } else {
                const newUser = new User({
                    nickname: profile.displayName,
                    vkontakte: profile.id,
                    profile: {
                        game: req.session.game,
                        rank: req.session.rank
                    }
                });
                newUser.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });
            }
        });
    }));

    // Discord Strategy
    const DiscordStrategy = require('passport-discord').Strategy;

    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        scope: ['identify', 'email'],
        callbackURL: '/users/auth/discord/callback'
    }, (req, accessToken, refreshToken, profile, done) => {
        User.findOne({ discord: profile.id }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, user)
            }

            User.findOne({ email: profile.email }, (err, emailUser) => {
                if (err) {
                    return done(err);
                }

                if (emailUser) {
                    return done(null, false);
                }

                const newUser = new User({
                    nickname: profile.username,
                    discord: profile.id,
                    email: profile.email,
                    profile: {
                        game: req.session.game,
                        rank: req.session.rank
                    }
                });
                newUser.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });
            });
        });
    }));

    // Serialization
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id })
            .populate('profile.game')
            .populate('profile.rank')
            .exec((err, user) => {
                cb(err, user);
            });
    });

};
