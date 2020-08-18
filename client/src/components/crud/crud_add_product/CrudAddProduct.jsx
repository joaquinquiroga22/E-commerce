import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import s from "./CrudAddProduct.module.css";
import defaultImage from "../../../img/default.jpg";
import CloseBtn from "../../close_btn/CloseBtn.jsx";

export default function CrudAddProduct(props) {
  //nombre, descripcion, precio, imagen, stock
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    image: "",
    categories: [1],
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
      image: input.image,
      categories: input.categories,
    };
    axios.post("http://localhost:3000/products", data).then((res) => {
      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
      }, 4000);
    });
  };

  //Funcion para convertir imagen a base64 obtenida de:
  //https://github.com/Rinlama/react-howtoseries
  const uploadImg = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setInput({
      ...input,
      image: base64,
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <form className={s.form} onSubmit={onSubmitHandle}>
      <CloseBtn close={props.onClose} />
      {success && (
        <Alert severity="success">Producto Agregado correctamente</Alert>
      )}
      <h2>Agregar un producto</h2>
      <div className={s.image}>
        <img src={input.image !== "" ? input.image : defaultImage} />
        <label htmlFor="imagen">Imagen del producto</label>
        <input
          type="file"
          name="imagen"
          onChange={(e) => {
            uploadImg(e);
          }}
        />
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
