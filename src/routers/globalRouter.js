import express from "express";
import { home } from "../controllers/globalcontroller.js";
const globalRouter = express.Router();

globalRouter.get("/", home);

export default globalRouter;