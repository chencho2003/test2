import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";
require("dotenv").config();

const app = express();

app.use(express.json());
// app.use(cors())
app.use(
  cors({
    origin: "test-backend-production-73b3.up.railway.app",
    credentials: true,
  })
);

app.use("/", userRoutes);

app.listen(process.env.PORT || 8800);
