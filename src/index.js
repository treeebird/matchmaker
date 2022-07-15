import express from "express";
import { send } from "express/lib/response";
import morgan from "morgan"
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import mongoose from "mongoose";
import session from "express-session";

const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);


app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended : true}));
app.use( session({
  secret: "Hello",
  resave: true,
  saveUninitialized: true,
}));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.listen(4000, console.log("Hello world"));
