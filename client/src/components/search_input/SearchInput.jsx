import React, { useState } from "react";
import Axios from "axios";
//imports de material iu
import Grid from "@material-ui/core/Grid";
//Estilos personalizados
import s from "./SearchInput.module.css";

//debe recibir una funcion por props
export default function SearchInput({ onSearch }) {
  const [search, setSearch] = useState("");
  //Agregar onSubmit a la funcion pasada por props
  ///search?valor=texto
  const handleInputChange = function (e) {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandle = function (e) {
    e.preventDefault();
    Axios.get(`http://localhost:3000/products`).then(function (res) {
      console.log(res);
    });
  };

  return (
    <form className={s.searchInput} onSubmit={onSubmitHandle}>
      <Grid container>
        <Grid item>
          <input
            type="text"
            placeholder="Buscar..."
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <input type="submit" value="Buscar" />
        </Grid>
      </Grid>
    </form>
  );
}
