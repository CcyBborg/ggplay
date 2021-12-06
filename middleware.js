const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.sendStatus(401);
const persistGame = (req, res, next) => {
    req.session.game = req.query.game;
    return next();
};

module.exports = {
    ensureAuthenticated,
    persistGame
};
