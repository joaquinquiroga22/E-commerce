import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../actions/user";

function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    // role: "",
  });
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
    }
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !user.name ? " is-invalid" : "")
            }
          />
          {submitted && !user.name && (
            <div className="invalid-feedback">First Name is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.lastname ? " is-invalid" : "")
            }
          />
          {submitted && !user.lastname && (
            <div className="invalid-feedback">Last Name is required</div>
          )}
        </div>
        <div className="form-group">
          <label>email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !user.email ? " is-invalid" : "")
            }
          />
          {submitted && !user.email && (
            <div className="invalid-feedback">Email is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.password ? " is-invalid" : "")
            }
          />
          {submitted && !user.password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Register
          </button>
          <Link to="/loginpage" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export { RegisterPage };
