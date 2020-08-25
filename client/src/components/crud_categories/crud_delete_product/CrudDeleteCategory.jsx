import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./CrudDeleteCategory.module.css";
import Alert from "@material-ui/lab/Alert";
import CloseBtn from "../../close_btn/CloseBtn.jsx";
import CancelBtn from "../../cancel_btn/CancelBtn.jsx";
import SuccessBtn from "../../success_btn/SuccessBtn.jsx";


export default function CrudDeleteProduct({ onClose, id }) {
  const [category, setCategory] = useState({
    name: "",
    description: ""
  });

  const [success, setSuccess] = useState(false);


  useEffect(() => {
    axios.get(`http://localhost:3000/products/category/${id}`).then(function (response) {
      console.log(response.data)
      setCategory({
        name: response.data.name,
        description: response.data.description,
      });
    });
  }, []);

  const onSubmitHandle = function (event) {
    event.preventDefault();

    axios
      .delete(`http://localhost:3000/products/category/${id}`)
      .then(function (res) {
        setSuccess(true);
        setTimeout(function () {
          setSuccess(false);
          onClose(false);
        }, 500);
      })
  };

    return (
      <form className={s.form} onSubmit={onSubmitHandle}>
        <div className={s.content}>
          <CloseBtn close={onClose} />
          <h3>Eliminar Category </h3>
          <div className={s.info}>
          <p><span>Nombre: </span> {category.name} </p>
          <p><span>Descripcion: </span>{category.name}</p>
          </div>
          {success && (
            <Alert severity="success">Categoria eliminado correctamente</Alert>
          )}
          <SuccessBtn text="Eliminar categoria"/>
          <CancelBtn text="Cancelar" close={onClose}/>
        </div>
      </form>
    );
}
