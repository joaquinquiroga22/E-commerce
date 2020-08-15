import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
import CrudUpdateProduct from "./components/crud/crud_update_product/CrudUpdateProduct.jsx";
import CrudAddProduct from "./components/crud/crud_add_product/CrudAddProduct.jsx";
import CrudDeleteProduct from "./components/crud/crud_delete_product/CrudDeleteProduct.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={CrudDeleteProduct} />
        <Route exact path="/add" component={CrudAddProduct} />
        <Route exact path="/update" component={CrudUpdateProduct} />
        <Route path="/" component={Navbar} />
        <Route exact path="/catalogue" component={Catalogue} />
        <Route exact path="/product/:id" component={Product} />
      </div>
    </Router>
  );
}

export default App;
