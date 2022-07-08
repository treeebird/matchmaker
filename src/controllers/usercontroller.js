import User from "../models/user";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("join");
}

export const postJoin = async (req, res) => {
    const { name, phoneNumber, gender, password, password2, grade, age } = req.body;
    const pageTitle = "Join";
    console.log(name, phoneNumber, password, grade, age);

    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle, errorMessage: "password not match"}); 
    } else {
        try {
            await User.create({
            name,
            phoneNumber,
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


