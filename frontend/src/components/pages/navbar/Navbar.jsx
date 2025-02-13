import { Link, useNavigate } from "react-router-dom";
import Style from "./Navbar.module.css";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };
  return (
    <div className={Style["nav"]}>
      <h2 style={{ color: "black" }}> E-Commerce</h2>
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/addproduct">Add Products</Link>
        </li>
        <li>
          <Link to="/update">Update Products</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {auth ? (
            <Link onClick={logout} to={"/register"}>
              Logout
            </Link>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
