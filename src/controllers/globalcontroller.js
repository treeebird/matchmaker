import Club from "../models/club.js";

export const home = async (req, res) => {
    if(req.session.loggedIn) {
        const clubs = await Club.find({});
        return res.render("home", { pageTitle: "Home", clubs});
    }
    return res.redirect("/users/login");
}