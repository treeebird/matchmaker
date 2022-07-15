import User from "../models/user";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("join");
}

export const postJoin = async (req, res) => {
    const { name, phoneNumber, gender, password, password2, grade, age } = req.body;
    const pageTitle = "Join";
    const lastFourPhoneNumber = phoneNumber.substr(-4)
    console.log(name, phoneNumber,lastFourPhoneNumber, password, grade, age);

    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle, errorMessage: "password not match"}); 
    } else {
        try {
            await User.create({
            name,
            phoneNumber,
            lastFourPhoneNumber,
            password,
            gender,
            grade,
            age,
            });
            return res.redirect("/");
        } catch (error) {
            return res.status(400).send(error);
            };

    }
    
}

export const getLogin = (req, res) => {
    return res.render("login");
}

export const postLogin = async (req, res) => {
    const pageTitle = "Login";
     const { lastFourPhoneNumber, password} = req.body;
     console.log(lastFourPhoneNumber, password);
    const user = await User.findOne({lastFourPhoneNumber})
     if(!user) {
        return res.status(400).render("login", {pageTitle: "Login", errorMessage:"Account is not exist"})
     }
     const ok = await bcrypt.compare(password, user.password);

     if(!ok) {
        return res.render("login", { pageTitle: "Login", errorMessage: "비밀번호가 맞지 않습니다."});
     }
     req.session.loggedIn = true;
     req.session.user = user;
    return res.redirect("/");
}

export const getEdit = (req, res) => {
    return res.render("editUser", {pageTitle: "Edit Profile"})
}

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}
