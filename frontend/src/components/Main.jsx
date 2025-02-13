import React from "react";
import { Route, Routes } from "react-router-dom";
// ------------Components---------------------------;
import SignUp from "./auth/SignUp";
import Private from "./pages/private/Private";
import Profile from "./pages/profile/Profile";
import Products from "./pages/products/Products";
import AddProduct from "./pages/addproduct/AddProduct";
import UpdateProduct from "./pages/updateproduct/UpdateProduct";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route element={<Private />}>
          <Route path="/" element={<Products />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Main;
