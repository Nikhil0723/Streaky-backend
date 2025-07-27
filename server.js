import express from "express";
import connectDB from "./config/connectDB.js";
import router from "./routes/auth.router.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const Port = process.env.PORT;

app.use("/auth", router);
app.get("/", (req, res) => {
  console.log("hello world");
});
app.listen(Port, () => {
  connectDB();
  console.log("backend is running");
});
