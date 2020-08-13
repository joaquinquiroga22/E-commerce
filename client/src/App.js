import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./containers/navbar/Navbar.jsx";
//Imports de prueba aqui antes del commit eliminarlos

//

//Solo dejar el navbar dentro de App, agregar y luego elimar para pruebas locales
function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
