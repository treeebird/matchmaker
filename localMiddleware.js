export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "모두의민턴";
    res.locals.loggedInUser = req.session.user;
    next();
}
