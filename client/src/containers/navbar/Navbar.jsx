import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchInput from "../../components/search_input/SearchInput.jsx";
import s from "./Navbar.module.css";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";
import Badge from "@material-ui/core/Badge";

import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../actions/cart.js";

export default function Navbar({ onSearch, botonNav }) {
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state.products);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (Cart) {
      setCount(Cart.length);
    }
  }, [Cart]);

  if (window.location.pathname === "/admin") {
    return (
      <div className={s.adminNav}>
        <Link to="/">
          <span>
            <ArrowBackIcon className={s.icon} />
            Atras
          </span>
        </Link>
        <h2 style={{ color: "white" }}>Panel de Administracion</h2>
      </div>
    );
  }
  const updateCart = function () {
    dispatch(getCart());
  };
  return (
    <div className={s.navbar}>
      <div className={s.top}>
        <Link to="/" className={s.logo}>
          <h2>Vivero E-commerce</h2>
        </Link>
        <SearchInput onSearch={onSearch} />
        <div>
          <button
            className={s.buttons}
            onClick={() => {
              botonNav(true);
            }}
          >
            Crear Cuenta/Usuario{" "}
          </button>
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
          <span>Mi Carrito</span>
        </Link>
        <Link to="/admin">
          <span>Administrar</span>
        </Link>
        <Link to="/loginpage">
          <span>Login</span>
        </Link>
      </div>
    </div>
  );
}
