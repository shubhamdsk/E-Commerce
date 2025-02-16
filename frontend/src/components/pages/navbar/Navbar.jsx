import { Link, useNavigate } from "react-router-dom";
import Style from "./Navbar.module.css";
import logo from '../../../assets/logo.jpg'
const Navbar = () => {
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth)?.user?.name;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };
  return (
    <div className={Style["nav"]}>
      {/* <h2 style={{ color: "black" }}> E-Commerce</h2> */}
        <img src={logo} alt="logo" />
      {auth ? <ul>
        <li> <Link to="/">Products</Link></li>
        <li> <Link to="/addproduct">Add Products</Link> </li>
        <li> <Link to="/update">Update Products</Link></li>
        <li> <Link to="/profile">Profile</Link></li>
        <li> <Link onClick={logout} to={"/login"}>Logout({user})</Link></li>
      </ul >
        :
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to={"/login"}>Login</Link></li>
        </ul>
      }
    </div >
  );
};

export default Navbar;
