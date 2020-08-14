import React from "react";
import s from "./CrudAddProduct.module.css";
import testImagen from "../../img/default.jpg";

export default function CrudAddProduct() {
  //nombre, descripcion, precio, imagen, stock
  return (
    <form className={s.form}>
      <div className={s.image}>
        <img src={testImagen} />
      </div>
      <div className={s.inputs}>
        <label for="nombre" autocomplete="false">
          Nombre de la categoria: 
        </label>
        <input type="text" />
        <label for="imagen">Imagen de la categoria: </label>
        <input type="file" name="imagen" />
        <input type="submit" value="Agregar Categoria" />
      </div>
    </form>
  );
}
