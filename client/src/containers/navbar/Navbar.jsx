import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalMallIcon from "@material-ui/icons/LocalMall";
import SearchInput from "../../components/search_input/SearchInput.jsx";
import s from "./Navbar.module.css";

export default function Navbar({ onSearch }) {
  if(window.location.pathname === '/admin'){
    return (<div className={s.adminNav}>
        <Link to="/">
          <span><ArrowBackIcon className={s.icon}/>Atras</span>
        </Link>
        <h2 style={{color:"white"}}>Panel de Administracion</h2>
      </div>)
  }
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
