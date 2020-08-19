import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import SearchInput from "../../components/search_input/SearchInput.jsx";
import s from "./Navbar.module.css";

export default function Navbar({ onSearch }) {
  return (
    <div className={s.nav}>
      <Link to="/">
        <h2 className={s.logo}>Vivero E-commerce</h2>
      </Link>
      <div className={s.links}>
        <Link to="/">
          <span>
            <HomeIcon className={s.icon} />
            Inicio
          </span>
        </Link>
        <Link to="/catalogo">
          <span>
            <LocalMallIcon className={s.icon} />
            Productos
          </span>
        </Link>
        <Link to="/admin">
          <span>Administrar</span>
        </Link>
      </div>
      <SearchInput onSearch={onSearch} />
    </div>
  );
}
