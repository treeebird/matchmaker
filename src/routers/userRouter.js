import express from "express";
import { append } from "express/lib/response";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/usercontroller";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/login").get(getLogin).post(postLogin);

export default userRouter;