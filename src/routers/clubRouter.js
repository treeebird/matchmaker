import express from "express";
import { getPlay, clubHome, clubGetJoin, clubPostJoin, postPlay, postAddplayer  } from "../controllers/clubcontroller.js";
const clubRouter = express.Router();


clubRouter.route("/join").get(clubGetJoin).post(clubPostJoin);
clubRouter.route("/").get(clubHome);
clubRouter.route("/:id/play").get(getPlay).post(postPlay);
clubRouter.route("/addPlayer").post(postAddplayer);

export default clubRouter;