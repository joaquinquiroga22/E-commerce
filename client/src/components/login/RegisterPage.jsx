import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./RegisterPage.module.css"
import { userActions } from "../../actions/user";
//Material-ui
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PersonIcon from '@material-ui/icons/Person';
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.7),
  },
}));

function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    // role: "",
  });
  const [info, setInfo] = useState({
         show: false,
         type: "",
         msg:""
       });

  const checkMatch = function(e){
         let password = document.getElementById("password");
         let confirmpassword = document.getElementById("confirmpassword");
         if(e.target.value !== password.value || e.target.value !== confirmpassword.value){
      
          return setInfo({
            show: true,
            type: "error",
            msg:"Las contraseñas no coinciden"
          })
       }
       setInfo({
        show: false,
        type: "",
        msg:""
      })
       }

const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    
    if (user.name && user.lastname && user.email && user.password) {
      dispatch(userActions.register(user));
      setInfo({show:true,type:"success",msg:"Cuenta creada con exito"})
                 setTimeout(function () {
                  setInfo({show:false,type:"",msg:""})
                 }, 1000);

    }
  }

  return (
    <Container component="main" maxWidth="xs">
    <div className = {s.contenedor}>
    <Typography
            component="div"
            style={{
            padding: "30px",
            height: "70vh",
            backgroundColor: "rgb(245 245 245)",
          }}
        >
      <h2 className = {s.title}>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className = {s.inputcontenedor}>
        <i className = {s.icon}>{<PersonIcon/>}</i>
          <input
            type="text"
            placeholder = "First Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          {submitted && !user.name && <div className = {s.subtitle}>First Name is required</div>}
        </div>
        <div className = {s.inputcontenedor}>
        <i className = {s.icon}>{<PermIdentityIcon/>}</i>
          <input
            type="text"
            placeholder = "Last Name"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
          />
          {submitted && !user.lastname && <div className = {s.subtitle}>Last Name is required</div>}
        </div>
        <div className = {s.inputcontenedor}>
        <i className = {s.icon}>{<MailOutlineIcon/>}</i>
          <input
            type="email"
            placeholder = "Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {submitted && !user.email && <div className = {s.subtitle}>Email is required</div>}
        </div>
        <div className = {s.inputcontenedor}>
        <i className = {s.icon}>{<VpnKeyIcon/>}</i>
          <input
            type="password"
            placeholder = "Password"
            name="password"
            value={user.password}
            id = "password"
            onChange={handleChange}
          />
          {submitted && !user.password && <div className = {s.subtitle}>Password is required</div>}
        </div>
         <div className = {s.inputcontenedor}>
         <i className = {s.icon}><LockOpenIcon/></i>
           <input
             type = "password"
             placeholder = "Confirm Password"
             name = "confirmpassword"
             id = "confirmpassword"
             onChange = {checkMatch}
             />
         </div>
         {info.show && (
           <Alert severity={info.type}>
              {info.msg}
             </Alert>
          )}
        <div>
            <Button
              type = "submit"
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<InputIcon />}
              >
              {registering && <span></span>}
              Register
            </Button>
            <Link to="/loginpage">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              endIcon={< CancelPresentationRoundedIcon/>}
              >
              
              Cancel
            </Button>
          </Link>

        </div>
      </form>
      </Typography>
    </div>
    </Container>
  );
}

export { RegisterPage };
