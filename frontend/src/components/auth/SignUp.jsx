import React, { useState } from "react";
import Style from "./SignUp.module.css";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const collectData = ()=>{
   console.log({name,email,password})
  }
  return (
    <div className={Style["register"]}>
      <h1 style={{ textAlign: "center", marginTop: "36px" }}>Sign Up</h1>
      <label htmlFor="name">Name</label>
      <input
        className={Style["inputbox"]}
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <label htmlFor="email">Email</label>
      <input
        className={Style["inputbox"]}
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <label htmlFor="password">Password</label>
      <input
        className={Style["inputbox"]}
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <button type="button" onClick={collectData}>Sign Up</button>

    </div>
  );
};

export default SignUp;
