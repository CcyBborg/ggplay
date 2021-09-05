const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.sendStatus(401);

module.exports = {
    ensureAuthenticated
};
