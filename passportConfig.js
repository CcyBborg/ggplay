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
    }, (accessToken, refreshToken, params, profile, done) => {
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
                        avatar: profile.photos?.[0].value || '/images/default-avatar.jpg'
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

    // Yandex strategy
    const YandexStrategy = require('passport-yandex').Strategy;

    passport.use(new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: '/users/auth/yandex/callback'
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ yandex: profile.id }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user)
                }

                User.findOne({ email: profile.emails[0].value }, (err, emailUser) => {
                    if (err) {
                        return done(err);
                    }

                    if (emailUser) {
                        return done(null, false);
                    }

                    const newUser = new User({
                        nickname: profile.username,
                        yandex: profile.id,
                        email: profile.emails[0].value,
                        profile: {
                            avatar: profile.photos?.[0].value || '/images/default-avatar.jpg'
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
        }
    ));

    // Google strategy
    const GoogleStrategy = require('passport-google-oauth20').Strategy;

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://ggplay.ru/users/auth/google/callback'
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ google: profile.id }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user)
                }

                User.findOne({ email: profile.emails[0].value }, (err, emailUser) => {
                    if (err) {
                        return done(err);
                    }

                    if (emailUser) {
                        return done(null, false);
                    }

                    const newUser = new User({
                        nickname: profile.displayName,
                        google: profile.id,
                        email: profile.emails[0].value,
                        profile: {
                            avatar: profile.photos?.[0].value || '/images/small-logo.png'
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
        }
    ));

    // Discord Strategy
    const DiscordStrategy = require('passport-discord').Strategy;

    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        scope: ['identify', 'email'],
        callbackURL: '/users/auth/discord/callback'
    }, (accessToken, refreshToken, profile, done) => {
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
                        avatar: profile?.avatar || '/images//images/default-avatar.jpg'
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
            .exec((err, user) => {
                cb(err, user);
            });
    });

};
