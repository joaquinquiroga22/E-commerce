import React, { useState, useEffect } from "react";
import axios from "axios";
import testImage from "../../../img/default.jpg";
import s from "./CrudDeleteProduct.module.css";
import Alert from "@material-ui/lab/Alert";

export default function CrudDeleteProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
  });
  const [render, setRender] = useState(true);
  const [success, setSuccess] = useState(false);

  const testID = 2;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${testID}`)
      .then(function (response) {
        setProduct({
          name: response.data.name,
          price: response.data.price,
          description: response.data.description,
          stock: response.data.stock,
        });
      });
  }, []);

  const onSubmitHandle = function (event) {
    event.preventDefault();

    axios
      .delete(`http://localhost:3000/products/${testID}`)
      .then(function (res) {
        console.log(res);
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const closeView = function () {
    setRender(false);
  };
  if (render) {
    return (
      <form className={s.form} onSubmit={onSubmitHandle}>
        <div className={s.viewProduct}>
          <div className={s.image}>
            <img src={testImage} />
          </div>
          <div className={s.info}>
            <h2>{product.name}</h2>
            <div>
              <h4>Descripcion</h4>
              <p>{product.description}</p>
            </div>
            <div>
              <h4>Precio</h4>
              <p>{product.price}</p>
            </div>
            <div>
              <h4>Stock</h4>
              <p>{product.stock}</p>
            </div>
          </div>
        </div>
        {success && (
          <div>
            <Alert severity="success">Producto eliminado correctamente</Alert>
            <input type="button" value="Volver" onClick={closeView} />
          </div>
        )}
        {!success && (
          <div>
            <input className={s.deleteBtn} type="submit" value="Eliminar" />
            <input type="button" value="Cancelar" />
          </div>
        )}
      </form>
    );
  }
  return null;
}
