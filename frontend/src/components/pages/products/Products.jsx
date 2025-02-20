import React, { useEffect, useState } from "react";
import { url } from "../../../environment/environment_url";
import { HashLoader } from 'react-spinners';
import styles from "./Products.module.css";
import "../../../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(url.product.get_product, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log("Fetched Products:", result);

      if (response.ok) {
        setProducts(result.products || []);
      } else {
        setError(result.message || "Failed to fetch products");
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      setError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(url.product.delete_product + id, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log({ result });

      if (result.success) {
        getProducts();
      } else {
        console.log("Failed to delete product:", result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error deleting product:", error);
      setLoading(false);
    }
  };



  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Products List</h1>

      {loading && (
        <div className="loader-overlay">
          <HashLoader className="loader" color="#356DC2" size={80} />
        </div>
      )}


      <div className={styles["table-container"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th >Operation</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id || index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.company}</td>
                  <td><button className={styles["deleteBtn"]} onClick={() => handleDelete(product._id)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "15px", color: "black" }}>
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 style={{ color: "red", textAlign: "center", height: "20px" }}>{error}</h3>
    </div>
  );
};

export default Products;
