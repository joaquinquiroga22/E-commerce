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
//import IconButton from "@material-ui/core/IconButton";
//import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
//import { green } from "@material-ui/core/colors";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
//import DraftsIcon from '@material-ui/icons/Drafts';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
//Redux
import { useSelector, useDispatch } from "react-redux";

import { addToCart, getCart, fetchCartFromDb } from "../../actions/cart";

import getOrCreateLocalStorage from "../../helpers/getLocalStorage";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    borderradius: "8px"
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
export default function Navbar({ onSearch, botonNav }) {
  const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.authentication.user);
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
      setTimeout(function () {
        dispatch(fetchCartFromDb(user.id));
      }, 1500);
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
                {/* <IconButton
                  aria-haspopup="true"
                  onClick={handleMenu}
                  zIndex="modal"
                  style={{ fontSize: 14, color: green[500] }}
                >
                  <AccountCircle style={{ fontSize: 18 }} />
                  <p> {user.name}</p>
                </IconButton>  */}
                <Button
                   aria-controls="customized-menu"
                   aria-haspopup="true"
                   variant="contained"
                   color="default"
                   onClick={handleClick}
                   startIcon = {<PersonIcon/>}
                   >
                   Usuario
                   </Button>
                   <StyledMenu
                   id="customized-menu"
                   anchorEl={anchorEl}
                   keepMounted
                   open={Boolean(anchorEl)}
                   onClose={handleClose}
                   >
                     <Link to = "/me">
                     <StyledMenuItem>
                     <ListItemIcon>
                     <AccountBoxIcon fontSize="small" />
                     </ListItemIcon>
                     <ListItemText secondary="Profile" />
                     </StyledMenuItem>
                     </Link>
                     <Link to = "/loginpage">
                     <StyledMenuItem>
                     <ListItemIcon>
                     <ExitToAppIcon fontSize="small" />
                     </ListItemIcon>
                     <ListItemText secondary="Cerrar Sesion" />
                     </StyledMenuItem>
                     </Link>
                     </StyledMenu>
                  
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
