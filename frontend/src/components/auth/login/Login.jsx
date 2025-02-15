import React, { useState } from "react";
import Style from "./Login.module.css";
import { url } from "../../../environment/environment_url";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setError({
      ...error,
      [name]: "",
    });
  };

  const handleValidate = () => {
    let errors = { email: "", password: "" };
    let valid = true;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format.";
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      valid = false;
    }
    setError(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (handleValidate()) {
      const response = await fetch(url.auth.login, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
    }
  };
  return (
    <div className={Style["form-container"]}>
      <div className={Style["register"]}>
        <h1 style={{ marginLeft: "150px" }}>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input
          className={Style["inputbox"]}
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email here"
        />
        <div className={Style["error-message"]}>{error.email}</div>

        <label htmlFor="password">Password</label>
        <input
          className={Style["inputbox"]}
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password here"
        />
        <div className={Style["error-message"]}>{error.password}</div>

        <button
          type="button"
          onClick={handleLogin}
          className={Style["submit-button"]}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
