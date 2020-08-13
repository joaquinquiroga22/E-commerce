import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import SearchInput from "../../components/search_input/SearchInput.jsx";
import s from "./Navbar.module.css";

export default function Navbar() {
  function onSearch(producto) {
    console.log(producto);
  }
  return (
    <div className={s.nav}>
      <h3 className={s.logo}>Vivero E-commerce</h3>
      <SearchInput onSearch={onSearch} />
    </div>
  );
}
