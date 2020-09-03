import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Components
import SearchInput from "../../components/search_input/SearchInput.jsx";
// Material y estilos
import s from "./Navbar.module.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { green } from "@material-ui/core/colors";
//Redux
import { useSelector, useDispatch } from "react-redux";

import { addToCart, getCart, fetchCartFromDb } from "../../actions/cart";

import getOrCreateLocalStorage from "../../helpers/getLocalStorage";

export default function Navbar({ onSearch, botonNav }) {
  const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem("user"));
  //const loggedIn = user ? true : false;

  const loggedIn = useSelector((state) => state.authentication.loggedIn);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart) {
      setCount(cart.products.length);
    }
  }, [cart]);

  useEffect(() => {
    if (user) {
      if (cart.products.length > 0) {
        cart.products.forEach((product) => {
          dispatch(addToCart(product, user.id));
        });
      }
      dispatch(fetchCartFromDb(user.id));
    } else {
      dispatch(getCart(getOrCreateLocalStorage()));
    }
  }, [loggedIn]);

  if (window.location.pathname === "/admin") {
    return (
      <div className={s.adminNav}>
        <Link to="/home">
          <span>
            <ArrowBackIcon className={s.icon} />
            Atras
          </span>
        </Link>
        <h2 style={{ color: "white" }}>Panel de Administracion</h2>
      </div>
    );
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={s.navbar}>
      <div className={s.top}>
        <Link to="/home" className={s.logo}>
          <h2>Vivero E-commerce</h2>
        </Link>
        <SearchInput onSearch={onSearch} />
        <div>
          <button className={s.buttons}>
            {loggedIn ? (
              <>
                <IconButton
                  aria-haspopup="true"
                  onClick={handleMenu}
                  zIndex="modal"
                  style={{ fontSize: 14, color: green[500] }}
                >
                  <AccountCircle style={{ fontSize: 18 }} />
                  <p> {user.name}</p>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  zIndex="modal"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/me">
                      <span>
                        <FilterVintageIcon className={s.icon} />
                        Profile
                      </span>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/loginpage" className={s.login}>
                      <span>Cerrar Sesion</span>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/loginpage" className={s.login}>
                <span>Iniciar Sesion</span>
              </Link>
            )}
          </button>
        </div>
      </div>
      <div className={s.nav}>
        <Link to="/home">
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
          {loggedIn && user.role === "admin" ? <span>Administrar</span> : <></>}
        </Link>
      </div>
    </div>
  );
}
