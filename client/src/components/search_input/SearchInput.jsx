import React, { useState } from "react";
import Axios from "axios";
//Estilos personalizados
import s from "./SearchInput.module.css";
import SearchIcon from "@material-ui/icons/Search";
//debe recibir una funcion por props
export default function SearchInput({ onSearch }) {
  const [search, setSearch] = useState("");
  //Agregar onSubmit a la funcion pasada por props
  ///search?valor=texto
  const handleInputChange = function (e) {
    setSearch(e.target.value);
  };

  const onSubmitHandle = function (e) {
    e.preventDefault();
    Axios.get(`http://localhost:3000/search?valor=${search}`).then(function (
      res
    ) {
      onSearch(res.data);
      console.log(res.data);
    });
  };

  //<input type="submit" value="Buscar" />
  return (
    <form className={s.searchInput} onSubmit={onSubmitHandle}>
      <input type="text" placeholder="Buscar..." onChange={handleInputChange} />
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}
