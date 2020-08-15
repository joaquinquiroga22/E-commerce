import React from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import s from "./CrudUpdateProduct.module.css";
import testImagen from "../../../img/default.jpg";

export default function CrudUpdateProduct() {
  //nombre, descripcion, precio, imagen, stock
  return (
    <form className={s.form}>
       <h2>Actualizar un producto</h2>
          <div className={s.image}>
          <img src={testImagen} />
          <label for="imagen">Imagen del producto</label>
          <input type="file" name="imagen" />
      </div>
      <div className={s.inputs}>
          <label for="nombre" autocomplete="false">
           Nombre:
          </label>
          <input type="text" name="nombre" />
          <label for="descripcion">Descripcion:</label>
          <textarea
          name="descripcion"
          rows="5"
          placeholder="Describe el producto"
          ></textarea>
          <div className={s.numbers}>
            <label for="precio">Precio $</label>
            <input type="number" name="precio" min="0" step="any" />
            <label className={s.stock} for="stock">
            Stock:
            </label>
            <input type="number" name="stock" min="0" step="1" />
          </div>
          <fieldset>
          <legend>Categorias</legend>
          <label for="planta">Planta</label>
          <input type="checkbox" value="planta" />
          <label for="maceta">Maceta</label>
          <input type="checkbox" value="maceta" />
        </fieldset>
        <input type="submit" value="Actualizar" />
        <Link to='/'> <input type="submit" value="Cancelar" />  </Link>
      
      </div>
    </form>
  );
}
