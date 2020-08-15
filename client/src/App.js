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
import CrudViewProduct from "./components/crud/crud_view_product/CrudViewProduct.jsx";
import AddCategory from "./components/crud/categoryform/CrudAddProduct.jsx";

function App() {

  const [search, setSearch] = useState("");

  const searchQuery = function (valor) {
    setSearch(valor);
  };
  return (
    <Router>
      <div className="App">
        <Route exact path="/delete" component={CrudDeleteProduct} />
        <Route exact path="/add" component={CrudAddProduct} />
        <Route exact path="/update" component={CrudUpdateProduct} />
        <Route exact path="/view" component={CrudViewProduct} />

        <Route exact path="/category" component={AddCategory} />
        <Route path="/" render={() => <Navbar onSearch={searchQuery} />} />

        <Route exact path="/" component={Catalogue} />
        <Route exact path="/product/:id" component={Product} />
      </div>
    </Router>

  );
}

export default App;
