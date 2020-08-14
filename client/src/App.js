import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./containers/navbar/Navbar.jsx";
//Imports de prueba aqui antes del commit eliminarlos
import Crud from "./containers/crud/Crud.jsx";
import CrudUpdateProduct from "./components/crud_update_product/CrudUpdateProduct.jsx"; //

//Solo dejar el navbar dentro de App, agregar y luego elimar para pruebas locales
function App() {
  return (
    <div className="App">
      <Navbar />
      <CrudUpdateProduct />
    </div>
  );
}

export default App;
