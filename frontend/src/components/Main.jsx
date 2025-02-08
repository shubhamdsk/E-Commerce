import React from "react";
import { Route, Routes } from "react-router-dom";
// ------------Components---------------------------;
import Logout from "./pages/logout/Logout";
import Profile from "./pages/profile/Profile";
import Products from "./pages/products/Products";
import AddProduct from "./pages/addproduct/AddProduct";
import UpdateProduct from "./pages/updateproduct/UpdateProduct";
import SignUp from "./auth/SignUp";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/update" element={<UpdateProduct />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Main;
