import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
// app.use(cors())
app.use(
  cors({
    origin: "https://test2-production-b226.up.railway.app",
    credentials: true,
  })
);

app.use("/", userRoutes);

app.listen(process.env.PORT || 8800);
