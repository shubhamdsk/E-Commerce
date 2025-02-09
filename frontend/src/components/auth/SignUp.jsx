import React, { useState } from "react";
import Style from "./SignUp.module.css";

const SignUp = () => {
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

  const validate = (field, value) => {
    let error = "";

    if (!value.trim()) {
      error = `${field} is required`;
    } else {
      if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format";
      }
      if (field === "password" && value.length < 6) {
        error = "Password must be at least 6 characters long";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validate(name, value);
  };

  const submitData = () => {
    let valid = true;

    Object.keys(formData).forEach((key) => {
      validate(key, formData[key]);
      if (!formData[key].trim() || errors[key]) valid = false;
    });

    if (valid) {
      console.log("Form submitted successfully", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className={Style["form-container"]}>
      <div className={Style["register"]}>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>

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
          onClick={submitData}
          className={Style["submit-button"]}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
