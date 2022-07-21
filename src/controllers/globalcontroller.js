export const home = (req, res) => {
    if(req.session.loggedIn) {
        return res.render("home", { pageTitle: "Home"});
    }
    return res.redirect("/users/login");
}