import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import s from "./CrudUpdateProduct.module.css";
import defaultImage from "../../../img/default.jpg";
import CloseBtn from "../../close_btn/CloseBtn.jsx";

export default function CrudUpdateProduct(props) {
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${props.id}`)
      .then(function (response) {
        setInput({
          name: response.data.name,
          price: response.data.price,
          description: response.data.description,
          stock: response.data.stock,
          image: response.data.image,
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
      image: input.image,
    };

    axios
      .put(`http://localhost:3000/products/${props.id}`, data)
      .then((res) => {
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
    <form onSubmit={onSubmitHandle} className={s.form}>
      <CloseBtn close={props.onClose} />
      {success && (
        <Alert severity="success">Producto actualizado correctamente.</Alert>
      )}
      <h2>Actualizar un producto</h2>
      <div className={s.image}>
        <img src={input.image !== "" ? input.image : defaultImage} />
        <label htmlFor="imagen">Imagen del producto</label>
        <input
          type="file"
          name="image"
          onChange={(e) => {
            uploadImg(e);
          }}
        />
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
