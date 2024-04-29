import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
// routes
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import bookingRoutes from "./routes/bookingRoutes";

import connectDB from "./config/DB";
import { StatusCodes } from "http-status-codes";
import errorHandler from "./middlewares/errorHandler";

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors({ methods: ["POST", "GET", "UPDATE", "DELETE", "PATCH"] }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.all("*", (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ status: "error", message: "can't find page" });
});

app.use(errorHandler);

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
