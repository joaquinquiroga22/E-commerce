import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./CrudDeleteProduct.module.css";
import Alert from "@material-ui/lab/Alert";
import CloseBtn from "../../close_btn/CloseBtn.jsx";
import CancelBtn from "../../cancel_btn/CancelBtn.jsx";
import SuccessBtn from "../../success_btn/SuccessBtn.jsx";


export default function CrudDeleteProduct({ onClose, id }) {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    image: "",
  });
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`).then(function (response) {
      setProduct({
        name: response.data.name,
        price: response.data.price,
        description: response.data.description,
        stock: response.data.stock,
        image: response.data.image,
      });
    });
  }, []);

  const onSubmitHandle = function (event) {
    event.preventDefault();

    axios
      .delete(`http://localhost:3000/products/${id}`)
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
          <h3>Eliminar producto</h3>
          <div className={s.info}>
          <p><span>Nombre: </span>{product.name}</p>
          <p><span>Descripcion: </span>{product.description}</p>
          <p><span>Precio: </span>{product.price}</p>
          <p><span>Stock: </span>{product.stock}</p>
          
          
          </div>
          {success && (
            <Alert severity="success">Producto eliminado correctamente</Alert>
          )}
          <SuccessBtn text="Eliminar producto"/>
          <CancelBtn text="Cancelar" close={onClose}/>
        </div>
      </form>
    );
}
