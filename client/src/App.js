import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
import Crud from "./containers/crud/Crud.jsx";

function App() {
  const [search, setSearch] = useState([]);

  const searchQuery = function (valor) {
    setSearch(valor);
  };
  return (
    <Router>
      <div className="App">
        <Route path="/" render={() => <Navbar onSearch={searchQuery} />} />
        <Route exact path="/admin" component={Crud} />
        <Route exact path="/" component={Catalogue} />
        <Route exact path="/product/:id" component={Product} />
        
      </div>
    </Router>
  );
}

export default App;
