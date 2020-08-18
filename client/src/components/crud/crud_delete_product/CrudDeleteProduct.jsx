import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "../../../img/default.jpg";
import s from "./CrudDeleteProduct.module.css";
import Alert from "@material-ui/lab/Alert";
import CloseBtn from "../../close_btn/CloseBtn.jsx";
export default function CrudDeleteProduct({ onClose, id }) {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    image: "",
  });
  const [render, setRender] = useState(true);
  const [success, setSuccess] = useState(false);

  const testID = 5;

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`).then(function (response) {
      setProduct({
        name: response.data.name,
        price: response.data.price,
        description: response.data.description,
        stock: response.data.stock,
        image: response.data.image,
      });
      console.log(response);
    });
  }, []);

  const onSubmitHandle = function (event) {
    event.preventDefault();

    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(function (res) {
        console.log(res);
        setSuccess(true);
        setTimeout(function () {
          setSuccess(false);
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (render) {
    return (
      <form className={s.form} onSubmit={onSubmitHandle}>
        <CloseBtn close={onClose} />
        <div className={s.viewProduct}>
          <div className={s.image}>
            <img src={product.image !== "" ? product.img : defaultImage} />
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
          <Alert severity="success">Producto eliminado correctamente</Alert>
        )}
        {!success && (
          <div>
            <input className={s.deleteBtn} type="submit" value="Eliminar" />
            <input
              onClick={() => onClose(false)}
              type="button"
              value="Cancelar"
            />
          </div>
        )}
      </form>
    );
  }
  return null;
}
