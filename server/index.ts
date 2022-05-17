import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { BvHttpStatusCode } from "./shared/constants/HTTPStatus";
import { ServerResponse } from "./shared/interceptors/serverResponse";
import authRoutes from "../server/routes/authRoutes";

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false
};

//Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// DataBase
import "./config/database";

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  try {
    return new ServerResponse(
      BvHttpStatusCode.OK,
      "Welcome to belle-vue project-backend | WIP",
      {},
      null
    ).sendResponse(res);
  } catch (error) {
    return new ServerResponse(
      BvHttpStatusCode.BAD_REQUEST,
      "something went wrong.",
      null,
      error
    ).sendResponse(res);
  }
});

//Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
