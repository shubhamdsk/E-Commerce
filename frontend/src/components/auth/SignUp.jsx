import React, { useState } from "react";
import Style from "./SignUp.module.css";
import { url } from "../../environment/environment_url";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Validation Method
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" }); // Clear error when user starts typing
    }
  };

  // Form Submission
  const handleSubmit = async () => {
    if (!validateForm()) return; // Stop submission if validation fails

    try {
      const response = await fetch(url.auth.register, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Registration successful");
        setFormData({ name: "", email: "", password: "" });
        setErrors({});
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className={Style["form-container"]}>
      <div className={Style["register"]}>
        <h1 style={{ marginLeft: "150px" }}>Sign Up</h1>

        <label htmlFor="name">Name</label>
        <input
          className={Style["inputbox"]}
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <div className={Style["error-message"]}>{errors.name}</div>

        <label htmlFor="email">Email</label>
        <input
          className={Style["inputbox"]}
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <div className={Style["error-message"]}>{errors.email}</div>

        <label htmlFor="password">Password</label>
        <input
          className={Style["inputbox"]}
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <div className={Style["error-message"]}>{errors.password}</div>

        <button
          type="button"
          onClick={handleSubmit}
          className={Style["submit-button"]}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
