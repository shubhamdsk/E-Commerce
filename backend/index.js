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

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, error: "Email is already registered" });
    }

    if (password.length < 6) {
      return res.status(200).json({
        success: false,
        error: "Password must be at least 6 characters long",
      });
    }

    const user = new User({ name, email, password });
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ result: "Email and password are required", success: false });
    }
    let user = await User.findOne({ email }).select("-password");

    if (user) {
      res.status(200).send({ success: true, status: 200, user });
    } else {
      res
        .status(401)
        .send({ success: false, status: 201, result: "No user found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .send({ success: false, status: 500, result: "Server error" });
  }
});

const PORT = 1709;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
