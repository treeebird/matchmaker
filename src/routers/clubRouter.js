import express from "express";
import { getPlay, clubHome, clubGetJoin, clubPostJoin } from "../controllers/clubcontroller";
const clubRouter = express.Router();


clubRouter.route("/join").get(clubGetJoin).post(clubPostJoin);
clubRouter.route("/").get(clubHome);
clubRouter.route("/:id/play").get(getPlay);

export default clubRouter;