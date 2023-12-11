import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="container-header">
      <img
        src="https://res.cloudinary.com/dmiocpap8/image/upload/v1683949470/facebook-logotype_iljfnj.png"
        alt="logo"
        className="header-img"
      />
      <nav className="header-nav">
        <ul className="header-list">
          <li className="header-list__item">
            <Link to="/">Home</Link>
          </li>
          <li className="header-list__item">
            <Link to="/Mentores" >Mentores</Link>
          </li>
          <li className="header-list__item">
            <Link>Mentorias</Link>
          </li>
          <li className="header-list__item">
            <Link to="/login">Login</Link>
          </li>
          <li className="header-list__item">
            <Link to="/stepperForm">Registrate</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
