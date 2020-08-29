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
    <div>
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          {submitted && !user.name && <div>First Name is required</div>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
          />
          {submitted && !user.lastname && <div>Last Name is required</div>}
        </div>
        <div>
          <label>email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {submitted && !user.email && <div>Email is required</div>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {submitted && !user.password && <div>Password is required</div>}
        </div>
        <div>
          <button>
            {registering && <span></span>}
            Register
          </button>
          <Link to="/loginpage">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export { RegisterPage };
