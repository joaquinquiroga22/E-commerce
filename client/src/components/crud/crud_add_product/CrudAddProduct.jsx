
import React, { useState } from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import s from "./CrudAddProduct.module.css";
import testImagen from "../../../img/default.jpg";
import CloseBtn from "../../close_btn/CloseBtn.jsx";

export default function CrudAddProduct() {
  //nombre, descripcion, precio, imagen, stock
  const [render, setRender] = useState(true);
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "price" || e.target.name === "stock") {
      setInput({ ...input, [e.target.name]: Number(e.target.value) });
    }
  };

  const onSubmitHandle = function (event) {
    event.preventDefault();

    const data = {
      name: input.name,
      price: input.price,
      description: input.description,
      stock: input.stock,
    };
    axios.post("http://localhost:3000/products", data).then((res) => {
      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
      }, 4000);
    });
  };
  const closeView = function () {
    setRender(false);
  };

  if (render) {
    return (
      <form className={s.form} onSubmit={onSubmitHandle}>
        <CloseBtn close={closeView} />
        {success && (
          <Alert severity="success">Producto Agregado correctamente</Alert>
        )}
        <h2>Agregar un producto</h2>
        <div className={s.image}>
          <img src={testImagen} />
          <label htmlFor="imagen">Imagen del producto</label>
          <input type="file" name="imagen" />
        </div>
        <div className={s.inputs}>
          <label htmlFor="name" autoComplete="off"></label>
          <input onChange={handleInputChange} type="text" name="name" />
          <label htmlFor="description">Descripcion:</label>
          <textarea
            onChange={handleInputChange}
            name="description"
            rows="5"
            placeholder="Describe el nuevo producto"
          ></textarea>
          <div className={s.numbers}>
            <label htmlFor="price">Precio $</label>
            <input
              onChange={handleInputChange}
              type="number"
              name="price"
              min="0"
              step="any"
            />
            <label className={s.stock} htmlFor="stock">
              Stock:
            </label>
            <input
              onChange={handleInputChange}
              type="number"
              name="stock"
              min="0"
              step="1"
            />
          </div>
          <fieldset>
            <legend>Categorias</legend>
            <label htmlFor="planta">Planta</label>
            <input type="checkbox" value="planta" />
            <label htmlFor="maceta">Maceta</label>
            <input type="checkbox" value="maceta" />
          </fieldset>
          <input type="submit" value="Agregar Producto" />
        </div>
      </form>
    );
  }
  return null;
}
