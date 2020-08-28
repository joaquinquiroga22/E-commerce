import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Alert from "@material-ui/lab/Alert";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { userActions } from "../../actions/user";

function LoginPage() {
  const [success, setSuccess] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  const user = useSelector((state) => state.authentication.user);
  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }
  const [seconds, setSeconds] = useState(1.5);

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
    setTimeout(function () {
      setSuccess(true);
    }, 1500);
    setTimeout(function () {
      setSuccess(false);
    }, 3000);
  }

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
          <form name="form" onSubmit={handleSubmit} noValidate>
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
              {success && (
                <Alert severity="success">
                  Hola {user.data && user.data.name}!
                  <p>Se ha logueado Correctamente</p>
                </Alert>
              )}
              <Grid md={12}>
                <Button type="submit" variant="contained" color="primary">
                  {loggingIn && <span></span>}
                  Login
                </Button>
                <Button variant="outlined" color="primary" href="/register">
                  Register
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
