import express from "express";
import "./db/config.js";
import User from "./db/user.js";
const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send({ message: "success", status: "ok", data: result });
});

app.listen(1709, () => {
  console.log("Your server is running on http://localhost:1709");
});
