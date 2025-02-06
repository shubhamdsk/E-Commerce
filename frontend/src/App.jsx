import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/pages/navbar/Navbar";
import Products from "../components/pages/products/Products";
import AddProduct from "../components/pages/addproduct/AddProduct";
import UpdateProduct from "../components/pages/updateproduct/UpdateProduct";
import Logout from "../components/pages/logout/Logout";
import Profile from "../components/pages/profile/Profile";
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <h1>E-Commerce</h1>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/update" element={<UpdateProduct />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
