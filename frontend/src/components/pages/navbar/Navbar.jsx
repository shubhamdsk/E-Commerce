import React from "react";
import { Link } from "react-router-dom";
import Style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={Style["nav"]}>
      <h2 style={{color:"black"}}> E-Commerce</h2>
      <ul>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/addproduct">Add Products</Link></li>
        <li><Link to="/update">Update Products</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
