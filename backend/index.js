import express from "express";
import cors from "cors";
import "./db/config.js";
import User from "./db/user.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const user = new User({ name, email, password });
    const result = await user.save();

    res.status(201).json({ message: "Registration successful", data: result });
  } catch (error) {
    console.error("Error in registration:", error);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 1709;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
