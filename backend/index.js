import express from "express";
import cors from "cors";
import "./db/config.js";
import User from "./db/user.js";
import Product from "./db/product.js";

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
        .json({ error: "Email and password are required", success: false });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "No user found" });
    }

    if (password !== user.password) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const userData = { ...user._doc };
    delete userData.password;

    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Add products
app.post("/add-product", async (req, res) => {
  try {
    const { name, price, category, userId, company } = req.body;

    if (!name || !price || !category || !userId || !company) {
      return res.status(400).json({ success: false, status: 400, error: "All fields are required" });
    }

    const product = new Product({ name, price, category, userId, company });
    const result = await product.save();

    res.status(201).json({ success: true, status: 201, message: "Product added successfully", product: result });
    console.log(result)

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, status: 500, error: "Internal Server Error" });
  }
});


const PORT = 1709;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
