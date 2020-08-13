import React, { useState } from "react";
//imports de material iu
import Grid from "@material-ui/core/Grid";
//Estilos personalizados
import s from "./SearchInput.module.css";

//debe recibir una funcion por props
export default function SearchInput({ onSearch }) {
  const [searchInfo, setSearchInfo] = useState("");
  return (
    <form
      className={s.searchInput}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchInfo);
      }}
    >
      <Grid container>
        <Grid item>
          <input
            className="input"
            type="text"
            placeholder="Buscar..."
            onChange={(e) => setSearchInfo(e.target.value)}
          />
        </Grid>
        <Grid item>
          <input type="submit" value="Buscar" />
        </Grid>
      </Grid>
    </form>
  );
}
