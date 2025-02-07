import React from "react";
// ------------Components----------------------
import Main from "./components/Main";
import Navbar from "./components/pages/navbar/Navbar";
import Footer from "./components/pages/footer/Footer";
//------------------- Css-----------------------
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
