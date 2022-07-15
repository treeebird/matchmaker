import express from "express";
import { append } from "express/lib/response";
import { getJoin, postJoin, getLogin, postLogin, logout, getEdit } from "../controllers/usercontroller";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit);

export default userRouter;