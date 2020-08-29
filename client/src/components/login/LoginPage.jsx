import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material-UI
import { FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
//Actions
import { userActions } from "../../actions/user";
import { alertActions } from "../../actions/alert";

function LoginPage(props) {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { email, password } = inputs;

  // Traigo el usuario del Local Storage
  const user = JSON.parse(localStorage.getItem("user"));
  //Selectores de estados en redux
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const alert = useSelector((state) => state.alert.message);

  const dispatch = useDispatch();
  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);
  useEffect(() => {
    dispatch(alertActions.clear());
  }, []);

  const preventDefault = (event) => event.preventDefault();
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(userActions.login(email, password));
      dispatch(alertActions.clear());
    }
    setSuccess(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography
          component="div"
          style={{
            padding: "35px",
            height: "50vh",
            backgroundColor: "rgb(245 245 245)",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form name="form" onSubmit={handleSubmit}>
            <Grid>
              <Grid md={12}>
                <FormControl margin="dense" variant="filled">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    aria-describedby="email-helper"
                    aria-label="true"
                    value={email}
                    onChange={handleChange}
                    required="true"
                  ></Input>
                  <FormHelperText id="email-helper">
                    Ingresa tu email
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid md={12}>
                <FormControl margin="dense" variant="filled">
                  <InputLabel htmlFor="pwd">Password</InputLabel>
                  <Input
                    id="pwd"
                    type="password"
                    name="password"
                    aria-describedby="password-helper"
                    value={password}
                    onChange={handleChange}
                    required="true"
                  ></Input>
                  <FormHelperText id="password-helper">
                    Ingresa tu contraseña
                  </FormHelperText>
                </FormControl>
              </Grid>

              {loggedIn &&
                setTimeout(function () {
                  setFailure(false);
                }, 1) &&
                success &&
                setTimeout(function () {
                  console.log(user.name);
                  setSuccess(false);
                  props.history.push("/home");
                }, 2500) && (
                  <Alert severity="success">
                    Hola {user && user.name}!<p>Se ha logueado Correctamente</p>
                  </Alert>
                )}
              {alert &&
                setTimeout(function () {
                  setFailure(true);
                }, 20) && <></>}
              {failure && (
                <Alert severity="error">
                  <p>Ingrese los datos correctamente</p>
                </Alert>
              )}
              <Grid md={12}>
                <Button type="submit" variant="contained" color="primary">
                  {loggingIn && <CircularProgress size="40" disableShrink />}
                  Login
                </Button>
                <Button variant="outlined" color="primary">
                  <Link to="/register">Registrate</Link>
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Olvido su contraseña?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </div>
    </Container>
  );
}

export { LoginPage };
