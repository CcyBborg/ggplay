const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.sendStatus(401);
const persistGameRank = (req, res, next) => {
    req.session.game = req.query.game;
    if (req.query.rank) {
        req.session.rank = req.query.rank;
    }

    return next();
};

module.exports = {
    ensureAuthenticated,
    persistGameRank
};
