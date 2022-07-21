import express from "express";
import { getPlay, clubHome } from "../controllers/clubcontroller";
const clubRouter = express.Router();

clubRouter.route("/").get(clubHome);
clubRouter.route("/luisvuicook/play").get(getPlay);

export default clubRouter;