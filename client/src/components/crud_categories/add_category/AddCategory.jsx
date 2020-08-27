import React from "react";
import s from "./AddCategory.module.css";
import { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import CloseBtn from "../../close_btn/CloseBtn.jsx";
import CancelBtn from "../../cancel_btn/CancelBtn.jsx";
import SuccessBtn from "../../success_btn/SuccessBtn.jsx";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../actions/categories";
import axios from "axios"

export default function AddC(props) {
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    if(props.type === "Edit"){
      axios
        .get(`http://localhost:3000/products/${props.id}`)
        .then(function (response) {
          setInput({
            name: response.data.name,
            description: response.data.description,
          });
        });
    }
  }, []);


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

    if(props.type === "Add"){
      axios.post("http://localhost:3000/products/category", data )
      .then((res) => {
        setSuccess(true);
        setTimeout(function() {
          setSuccess(false);
        }, 1500)
      })
    }
    if(props.type === "Edit"){
      axios
        .put(`http://localhost:3000/products/category/${props.id}`, data)
        .then((res) => {
          setSuccess(true);
          setTimeout(function () {
            setSuccess(false);
          }, 1500);
        });
    }
   

    // dispatch(addCategory(data));
    // setSuccess(true);
  };

  

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.content}>
      <h3>{props.type === "Edit" ? "Actualizar una categoria" : "Agregar una categoria"}</h3>
        <CloseBtn close={props.onClose} />
        
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
              {props.type === "Edit" ? 
              "Producto actualizado correctamente" : "Producto agregado correctamente"}
              </Alert>
              
          )}
        
        <SuccessBtn text={props.type === "Edit" ? "Actualizar producto" : "Agregar producto"} />
        <CancelBtn text="Cancelar" close={props.onClose} />
      </div>
    </form>
  );
}
