import React, { useState } from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import s from "./AddUser.module.css";
import CloseBtn from "../close_btn/CloseBtn.jsx";
import CancelBtn from "../cancel_btn/CancelBtn.jsx";
import SuccessBtn from "../success_btn/SuccessBtn.jsx";

export default function AddUser(props) {
  const [success, setSuccess] = useState(false);

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandle = function (e) {
    e.preventDefault();
    const data = {
      name: input.name,
      lastname: input.lastname,
      email: input.email,
      password: input.password,
      role: "admin",
    };
    console.log("esto en onsubmit");
    console.log(data);
    axios
      .post("http://localhost:3000/users", data)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setTimeout(function () {
          setSuccess(false);
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={s.form} onSubmit={onSubmitHandle}>
      <div className={s.content}>
        <CloseBtn close={props.onClose} />
        <h3>
          {props.type === "Edit"
            ? "Modificar Cuenta/Usuario"
            : "Crear Cuenta/Usuario"}
        </h3>

        <div className={s.inputs}>
          <fieldset>
            <legend>Nombre</legend>
            <input
              value={input.name}
              className={s.input}
              onChange={handleInputChange}
              type="text"
              name="name"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Apellido</legend>
            <input
              value={input.lastname}
              className={s.input}
              onChange={handleInputChange}
              name="lastname"
              required
            ></input>
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input
              value={input.email}
              className={s.input}
              onChange={handleInputChange}
              type="email"
              name="email"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              value={input.password}
              className={s.input}
              onChange={handleInputChange}
              type="password"
              name="password"
              required
            ></input>
          </fieldset>
          {success && (
            <Alert severity="success">
              {props.type === "Edit"
                ? "Cuenta Actualizada correctamente"
                : "Cuenta creada correctamente"}
            </Alert>
          )}
          <SuccessBtn
            text={props.type === "Edit" ? "Modificar Cuenta" : "Crear Cuenta"}
          />
          <CancelBtn text="Cancelar" close={props.onClose} />
        </div>
      </div>
    </form>
  );
}
