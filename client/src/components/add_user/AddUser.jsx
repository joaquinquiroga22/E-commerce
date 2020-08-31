// import React, { useState } from "react";
// import axios from "axios";
// import Alert from "@material-ui/lab/Alert";
// import s from "./AddUser.module.css";
// import CloseBtn from "../close_btn/CloseBtn.jsx";
// import CancelBtn from "../cancel_btn/CancelBtn.jsx";
// import SuccessBtn from "../success_btn/SuccessBtn.jsx";

// export default function AddUser(props) {
//   const [success, setSuccess] = useState(false);
//   const [info, setInfo] = useState({
//     show: false,
//     type: "",
//     msg: "",
//   });

//   const [input, setInput] = useState({
//     name: "",
//     lastname: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//   });

//   const checkMatch = function (e) {
//     let password = document.getElementById("password");
//     let confirmpassword = document.getElementById("confirmpassword");
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//     if (
//       e.target.value !== password.value ||
//       e.target.value !== confirmpassword.value
//     ) {
//       return setInfo({
//         show: true,
//         type: "error",
//         msg: "Las contraseñas no coinciden",
//       });
//     }
//     setInfo({
//       show: false,
//       type: "",
//       msg: "",
//     });
//   };

//   const handleInputChange = function (e) {
//     var error = "";
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onSubmitHandle = function (e) {
//     e.preventDefault();
//     const data = {
//       name: input.name,
//       lastname: input.lastname,
//       email: input.email,
//       password: input.password,
//       role: "admin",
//     };
//     axios
//       .post("http://localhost:3000/users", data)
//       .then((res) => {
//         if (res.status === 201) {
//           setInfo({
//             show: true,
//             type: "success",
//             msg: "Cuenta creada con exito",
//           });
//           setTimeout(function () {
//             setInfo({ show: false, type: "", msg: "" });
//           }, 1000);
//         } else {
//           var error = res.data.original.detail;
//           error = error.replace("(email)=", "");
//           error = error.replace("la llave", "el email");
//           setInfo({ show: true, type: "error", msg: error });
//         }
//       })
//       .catch((err) => {
//         alert("Error del server");
//       });
//   };

//   return (
//     <form className={s.form} onSubmit={onSubmitHandle}>
//       <div className={s.content}>
//         <CloseBtn close={props.onClose} />
//         <h3>
//           {props.type === "Edit"
//             ? "Modificar Cuenta/Usuario"
//             : "Crear Cuenta/Usuario"}
//         </h3>

//         <div className={s.inputs}>
//           <fieldset>
//             <legend>Nombre</legend>
//             <input
//               value={input.name}
//               className={s.input}
//               onChange={handleInputChange}
//               type="text"
//               name="name"
//               required
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Apellido</legend>
//             <input
//               value={input.lastname}
//               className={s.input}
//               onChange={handleInputChange}
//               name="lastname"
//               required
//             ></input>
//           </fieldset>
//           <fieldset>
//             <legend>Email</legend>
//             <input
//               value={input.email}
//               className={s.input}
//               onChange={handleInputChange}
//               type="email"
//               name="email"
//               required
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Password</legend>
//             <input
//               value={input.password}
//               className={s.input}
//               onChange={checkMatch}
//               type="password"
//               name="password"
//               id="password"
//               required
//             ></input>
//           </fieldset>
//           <fieldset>
//             <legend>Confirmar password</legend>
//             <input
//               value={input.confirmpassword}
//               className={s.input}
//               onChange={checkMatch}
//               type="password"
//               name="confirmpassword"
//               id="confirmpassword"
//               required
//             ></input>
//           </fieldset>
//           {info.show && <Alert severity={info.type}>{info.msg}</Alert>}
//           <SuccessBtn
//             text={props.type === "Edit" ? "Modificar Cuenta" : "Crear Cuenta"}
//           />
//           <CancelBtn text="Cancelar" close={props.onClose} />
//         </div>
//       </div>
//     </form>
//   );
// }

//

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  // menu: {
  //   zIndex: "modal",
  // },
}));

export default function AddUser() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* // <div className={classes.root}> */}
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      {/* <AppBar position="static"> */}
      {/* <Toolbar> */}
      {/* <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton> */}
      {/* <Typography variant="h6" className={classes.title}>
        Photos
      </Typography> */}
      {/* {auth && ( */}
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        zIndex="modal"
        // className={classes.menu}
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
      {/* )} */}
      {/* </Toolbar> */}
      {/* </AppBar> */}
      {/* </div> */}
    </div>
  );
}
