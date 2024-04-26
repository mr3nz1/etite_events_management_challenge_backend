import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import userRoute from "./routes/userRoutes";
import connectDB from "./config/DB";

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors({ methods: ["POST", "GET", "UPDATE", "DELETE"] }));

app.use("/api/v1/users", userRoute);

async function initDB() {
  try {
    console.log("Connecting to DB");
    const DB_URI = process.env.MONGO_URI!;
    await connectDB(DB_URI);
    console.log("Connected");
  } catch (err) {
    console.log(err);
  }
}

initDB();

export default app;
