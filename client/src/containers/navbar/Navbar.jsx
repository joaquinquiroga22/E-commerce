import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchInput from "../../components/search_input/SearchInput.jsx";
import s from "./Navbar.module.css";
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import Badge from "@material-ui/core/Badge";

export default function Navbar({ onSearch, botonNav }) {
  const [count, setCount] = React.useState(15);
  if(window.location.pathname === '/admin'){
    return (<div className={s.adminNav}>
        <Link to="/">
          <span><ArrowBackIcon className={s.icon}/>Atras</span>
        </Link>
        <h2 style={{color:"white"}}>Panel de Administracion</h2>
      </div>)
  }
  return (
    <div className={s.navbar}>
      <div className={s.top}>
        <Link to="/" className={s.logo}>
          <h2 >Vivero E-commerce</h2>
        </Link>
        <SearchInput onSearch={onSearch} />
        <div>
        <button className={s.buttons} onClick = {() => {botonNav(true)}}> Crear Cuenta/Usuario </button>
        </div>
      </div>
      <div className={s.nav}>
        <Link to="/">
          <span>
            <HomeIcon className={s.icon} />
            Inicio
          </span>
        </Link>
        <Link to="/catalogo">
          <span>
            <FilterVintageIcon className={s.icon} />
            Productos
          </span>
        </Link>
        <Link to="/carrito">
            <span>
            <Badge color="secondary" badgeContent={count}>
          <ShoppingCartOutlinedIcon />
        </Badge>
            </span>
            <span>
              Mi Carrito
            </span>
        </Link>
        <Link to="/admin">
          <span>Administrar</span>
        </Link>

      </div>
    </div>
  );
}
