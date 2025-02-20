import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Style from "./AddProduct.module.css";
import { url } from "../../../environment/environment_url";

const AddProduct = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productCategory: "",
    productCompany: "",
  });

  const [error, setError] = useState({
    productName: "",
    productPrice: "",
    productCategory: "",
    productCompany: "",
  });

  const [backendError, setBackendError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setBackendError("");
  };

  const handleValidate = () => {
    let valid = true;
    let errors = { productName: "", productPrice: "", productCategory: "", productCompany: "" };

    if (!formData.productName.trim()) {
      errors.productName = "Product name is required.";
      valid = false;
    }
    if (!formData.productPrice.trim()) {
      errors.productPrice = "Product price is required.";
      valid = false;
    }
    if (!formData.productCategory.trim()) {
      errors.productCategory = "Product category is required.";
      valid = false;
    }
    if (!formData.productCompany.trim()) {
      errors.productCompany = "Product company is required.";
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user?._id;

    if (!userId) {
      setBackendError("User authentication failed. Please log in again.");
      return;
    }

    setBackendError("");
    if (!handleValidate()) return;

    const payload = {
      name: formData.productName,
      price: formData.productPrice,
      category: formData.productCategory,
      company: formData.productCompany,
      userId,
    };

    try {
      const response = await fetch(url.product.add_product, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log(result);

      if (response.ok && result.success) {
        setFormData({
          productName: "",
          productPrice: "",
          productCategory: "",
          productCompany: "",
        });
        setBackendError("");
        navigate('/')
      } else {
        setBackendError(result.error || "Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setBackendError("Network error! Please check your connection.");
    }
  };

  return (
    <div className={Style["form-container"]}>
      <div className={Style["add-product"]}>
        <h1 style={{ textAlign: "center", marginLeft: "30%" }}>Add product</h1>

        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          name="productName"
          className={Style["inputbox"]}
          placeholder="Write product name here"
          value={formData.productName}
          onChange={handleChange}
        />
        <div className={Style["error-message"]}>{error.productName}</div>

        <label htmlFor="productPrice">Product Price</label>
        <input
          type="number"
          name="productPrice"
          className={Style["inputbox"]}
          placeholder="Write product price here"
          value={formData.productPrice}
          onChange={handleChange}
        />
        <div className={Style["error-message"]}>{error.productPrice}</div>

        <label htmlFor="productCategory">Product Category</label>
        <input
          type="text"
          name="productCategory"
          className={Style["inputbox"]}
          placeholder="Write product category here"
          value={formData.productCategory}
          onChange={handleChange}
        />
        <div className={Style["error-message"]}>{error.productCategory}</div>

        <label htmlFor="productCompany">Product Company</label>
        <input
          type="text"
          name="productCompany"
          className={Style["inputbox"]}
          placeholder="Write product company here"
          value={formData.productCompany}
          onChange={handleChange}
        />
        <div className={Style["error-message"]}>{error.productCompany}</div>

        <button className={Style["addProduct"]} onClick={handleSave}>Add Product</button>
        <div className={Style["backend-error"]}>{backendError}</div>
      </div>
    </div>
  );
};

export default AddProduct;
