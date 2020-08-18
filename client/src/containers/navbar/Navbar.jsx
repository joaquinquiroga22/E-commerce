import React from "react";
import { Link } from "react-router-dom";

import SearchInput from "../../components/search_input/SearchInput.jsx";
import s from "./Navbar.module.css";

export default function Navbar({ onSearch }) {
  return (
    <div className={s.nav}>
      <div className={s.topnav}>
        <Link to="/">
          <h3 className={s.logo}>Vivero E-commerce</h3>
        </Link>
        <SearchInput onSearch={onSearch} />
      </div>
      <div className={s.navigation}>
        <Link to="/catalogo">Catalogo</Link>
        <Link to="/admin">Administrar</Link>
      </div>
    </div>
  );
}
