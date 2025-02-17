import React, { useState } from "react";
import Style from "./AddProduct.module.css";

const AddProduct = () => {
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

  const handleSave = () => {
    if (!handleValidate()) return;
    console.log({ formData });

    setFormData({
      productName: "",
      productPrice: "",
      productCategory: "",
      productCompany: "",
    });
  };

  return (
    <div className={Style["form-container"]}>
      <div className={Style["add-product"]}>
        <h1 style={{ textAlign: "center", marginLeft: '30%' }}>Add product</h1>
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

        <label htmlFor="productPrice">Product Price </label>
        <input
          type="number"
          name="productPrice"
          className={Style["inputbox"]}
          placeholder="Write product price here"
          value={formData.productPrice}
          onChange={handleChange}
        />
        <div className={Style["error-message"]}>{error.productPrice}</div>

        <label htmlFor="productCategory">Product Category </label>
        <input
          type="text"
          name="productCategory"
          className={Style["inputbox"]}
          placeholder="Write product category here"
          value={formData.productCategory}
          onChange={handleChange}
        />
        <div className={Style["error-message"]}>{error.productCategory}</div>

        <label htmlFor="productCompany">Product Company </label>
        <input
          type="text"
          name="productCompany"
          className={Style["inputbox"]}
          placeholder="Write product company here"
          value={formData.productCompany}
          onChange={handleChange}
        />
        <div className={Style["error-message"]}>{error.productCompany}</div>

        <button onClick={handleSave}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;
