import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./CrudUpdateProduct.module.css";
import testImagen from "../../../img/default.jpg";

export default function CrudUpdateProduct() {
  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
  });
  const testID = 1;

  useEffect(() => {
    axios.get("http://localhost:3000/products/1").then(function (response) {
      setInput({
        name: response.data.name,
        price: response.data.price,
        description: response.data.description,
        stock: response.data.stock,
      });
    });
  }, []);

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

    //HARDCODEADO PELIGROO!
    axios.put("http://localhost:3000/products/1", data).then((res) => {
      console.log("res: " + res);
      console.log("resdata: " + res.data);
    });
  };

  return (
    <form onSubmit={onSubmitHandle} className={s.form}>
      <h2>Actualizar un producto</h2>
      <div className={s.image}>
        <img src={testImagen} />
        <label htmlFor="imagen">Imagen del producto</label>
        <input type="file" name="imagen" />
      </div>
      <div className={s.inputs}>
        <label htmlFor="name">Nombre:</label>
        <input
          value={input.name}
          type="text"
          name="name"
          onChange={handleInputChange}
        />
        <label htmlFor="description">Descripcion:</label>
        <textarea
          value={input.description}
          name="description"
          rows="5"
          placeholder="Describe el producto"
          onChange={handleInputChange}
        ></textarea>
        <div className={s.numbers}>
          <label htmlFor="price">Precio $</label>
          <input
            value={input.price}
            type="number"
            name="price"
            min="0"
            step="any"
            onChange={handleInputChange}
          />
          <label className={s.stock} htmlFor="stock">
            Stock:
          </label>
          <input
            value={input.stock}
            type="number"
            name="stock"
            min="0"
            step="1"
            onChange={handleInputChange}
          />
        </div>
        <fieldset>
          <legend>Categorias</legend>
          <label htmlFor="planta">Planta</label>
          <input type="checkbox" value="planta" />
          <label htmlFor="maceta">Maceta</label>
          <input type="checkbox" value="maceta" />
        </fieldset>
        <input type="submit" value="Actualizar Producto" />
      </div>
    </form>
  );
}
