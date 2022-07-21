import express from "express";
import { getPlay } from "../controllers/clubcontroller";
const clubRouter = express.Router();

clubRouter.route("/luisvuicook/play").get(getPlay);

export default clubRouter;