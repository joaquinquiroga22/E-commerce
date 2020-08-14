import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Catalogue} />
      </div>
    </Router>
  );
}

export default App;
