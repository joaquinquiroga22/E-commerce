import React from "react";
import axios from "axios";
import s from "./AddCategory.module.css";
import Alert from "@material-ui/lab/Alert";
import testImagen from "../../../img/default.jpg";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import CloseBtn from "../../close_btn/CloseBtn.jsx";
import CancelBtn from "../../cancel_btn/CancelBtn.jsx";
import SuccessBtn from "../../success_btn/SuccessBtn.jsx";

import { useDispatch } from "react-redux";
import { addCategory } from "../../../actions/categories";

export default function AddC(props) {
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const data = {
      name: input.name,
      description: input.description,
    };

    // axios.post("http://localhost:3000/products/category", data ).then((res) => {
    //   console.log(res.data)
    // })
    dispatch(addCategory(data));
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.content}>
        <CloseBtn close={props.onClose} />
        <h3>Crear Categoria </h3>
        <fieldset>
          <legend>Nombre de la categoria</legend>
          <input
            className={s.input}
            placeholder="Nombre de la categoria"
            type="text"
            name="name"
            value={input.name}
            onChange={handleInputChange}
            autofocus
          />
        </fieldset>
        <fieldset>
          <legend>Descripcion</legend>
          <textarea
            className={s.input}
            onChange={handleInputChange}
            name="description"
            rows="5"
            placeholder="Describe la nueva categoria"
          ></textarea>
        </fieldset>
        {success && (
          <Alert severity="success">
            {props.type === "Edit"
              ? "Categoria actualizada correctamente"
              : "Categoria agregada correctamente"}
          </Alert>
        )}
        <SuccessBtn text="Crear Categoria" />
        <CancelBtn text="Cancelar" close={props.onClose} />
      </div>
    </form>
  );
}
